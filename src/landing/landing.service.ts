import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Landing, LandingDocument } from './schemas/landing.schema';
import { AiService } from 'src/ai/ai.service';

import { Sections } from './entities/sections.entity';
import { COLOR_PALLETES } from './templates/colors.templates';

@Injectable()
export class LandingService {
    constructor(
        private aiService: AiService,
        @InjectModel(Landing.name) private landingModel: Model<LandingDocument>
    ){}

    questionnaire() {
        return [
            {
                name: "type",
                type: 'choice',
                messages: [
                    "Привіт! Я – асистент Green Button, радий допомогти Вам. Щоб створити найкращий лендінг для Вашого бізнесу, мені знадобляться кілька відповідей на запитання.",
                    "Для початку, будь ласка, виберіть тип лендінгу, який Ви плануєте створити:"
                ],
                options: [
                    {title: "Ecommerce", slug: "ecommerce"}, 
                    {title: "Promotion", slug: "promotion"}
                ]
            },
            {
                name: "Description",
                type: "text",
                messages: ["Поділіться, будь ласка, інформацією про ваш бізнес та основні продукти чи послуги, які ви надаєте. Яка ваша унікальна пропозиція, що робить вас особливими для клієнтів?"],
                tips: `Наприклад: "Ми спеціалізуємося на продажі виробів ручної роботи зі шкіри. Це гаманці, ремені та сумки."`
            },
            {
                name: "action",
                type: 'choice',
                messages: [
                    "Які основні дії мають здійснити відвідувачі вашого сайту? Виберіть 1 варіант:"
                ],
                options: [
                    {title: "Зателефонувати", slug: "call"}, 
                    {title: "Надіслати повідомлення", slug: "send-a-message"},
                    {title: "Перейти до чат боту/соц мережі", slug: "go-to-socials"}
                ]
            },
            {
                name: "products",
                type: 'products',
                messages: [
                    "Чудово! 40% лендінгу вже готово!🚀",
                    "Вкажіть будь ласка найменування товарів, їх ціну і додайте фотографії:"
                ],
                max: 3,
                min: 1    
            },
            {
                name: "company_name",
                type: 'text',
                messages: [
                    "Чудово! 80% лендінгу вже готово!🚀",
                    "Вкажіть будь ласка назву вашої компанії:"
                ]
            },
            {
                name: "logo",
                type: "attachment",
                accept: "image/png, image/jpeg, image/webp, image/svg",
                messages: [
                    "Дякую! Чи маєте Ви логотип, який слід використовувати на сторінці? Будь ласка, завантажте його тут або надішліть посилання для завантаження.",
                ],
                can_skip: true
            },
            {
                name: "color",
                type: "color-picker",
                messages: [
                    "Дякую! Чи є у Вас брендбук, який містить стильові керівництва для вашого бренду?",
                ],
                can_skip: true
            }
        ];
    }

    async getNeededSectionsList(body) {
        try {
            let request = `Which of these sections: ${Sections.map(item => item.component).join(', ')}
                are suitable for landing page with such requirements: landing page type - "${body.type}", landing page description - "${body.description}", landing main action - "${body.action}", company name - "${body.company_name}".`;
            
            if (body.products?.length > 0) {
                request += `Also, there is additional information about the products that will be presented on this landing page, namely: 
                    ${body.products.map((product, product_index) => `${body.products.length > 1 ? product_index + 1 + ")" : ''} ${product.name}`).join(body.products.length > 1 ? ', ' : '')}
                `;
            }
            request += 'Choose only needed sections, and do not include sections, for which chatGpt and Dall-e can;t generate content, like titles, text, images, lists.';

            let neededSections = await this.aiService.text({
                messages: [{role: "user", content: request }],
                functions: [{
                    name: "Sections",                    
                    description: "Needed sections for landing in json format",
                    parameters: {
                        type: "object",
                        properties: {
                            sections: {
                                type: "array",
                                items: {
                                    type: "string",
                                    description: "List only of needed sections"
                                }
                            },
                        }
                    }
                }]
            });

            if (!neededSections?.message?.function_call?.arguments) {
                return false;
            }

            return JSON.parse(neededSections.message.function_call.arguments).sections;
        } catch(e) {
            throw new HttpException(e.message, e.status);
        }
    }

    async create(userId, body) {
        try {
            if (!body?.company_name?.length) {
                throw new HttpException('error', HttpStatus.BAD_REQUEST);
            }

            // Convert company name to domain format
            let domain = body.company_name
                .trim() // remove leading and trailing spaces
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\s-]/g, '') // remove all non-alphanumeric characters except spaces and hyphens
                .split(' ')
                .filter(s => s.length !== 0)
                .join('-');

            let isExist = await this.landingModel.findOne({ domain: domain });
            if (isExist) {
                throw new HttpException('domain_already_exist', HttpStatus.BAD_REQUEST);
            }
 
            let neededSectionsList = await this.getNeededSectionsList(body);
            if (!neededSectionsList) {
                throw new HttpException('server_error', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            let sections = await Promise.all(neededSectionsList.map(async (sectionName, sectionIndex) => {
                let sectionDataReq = `Generate a content for section "${sectionName}", for landing page with such requirements: landing page type - "${body.type}", landing page description - "${body.description}", landing main action - "${body.action}", company name - "${body.company_name}".`;
                    sectionDataReq += 'All next generated content should be in Ukrainian language.';

                let section = Sections.find(el => el.component == sectionName);
                
                let sectionData = await this.aiService.text({
                    messages: [{role: "user", content: sectionDataReq }],
                    functions: [{
                        name: "Sections",                    
                        description: "Needed sections for landing in json format",
                        parameters: {
                            type: "object",
                            properties: section.block
                        }
                    }] 
                });

                if (!sectionData?.message?.function_call?.arguments) {
                    return false;
                }
                return {
                    ...section, 
                    settings: {
                        ...section.settings,
                        // Random Variation
                        variation: section.settings.variation[Math.floor(Math.random() * section.settings.variation.length)]
                    },
                    id: `${sectionName.toLowerCase()}-${sectionIndex + 1}`,
                    block: JSON.parse(sectionData.message.function_call.arguments)
                };
            }));

            return sections;

            // let aiRes = await this.aiService.text({
            //     messages: [
            //         { 
            //             role:"user", 
            //             content: `"Generate content for the landing page. The type of this landing page is ${body.type}, and he is about: ${body.description}"`}
            //     ],
            //     functions: [{
            //         name: "Hero",                    
            //         description: "Hero section content in json format",
            //         parameters: {
            //             "type": "object",
            //             "properties": {
            //                 "title": {
            //                     "type": "string",
            //                     "description": "Title of this section"
            //                 },
            //                 "subtitle": {
            //                     "type": "string",
            //                     "description": "Subtitle of this section"
            //                 },
            //                 "benefits": {
            //                     "type": "array",
            //                     "description": "Benefits",
            //                     "items": {
            //                         "type": "string",
            //                         "description": "Benefits item"
            //                     }   
            //                 } 
            //             }
            //         }
            //     }]
            // });
            
            // let res = aiRes?.choices[0]?.message?.function_call?.arguments; 
            // return res ? JSON.parse(res) : 'error';
            // return Sections.map(item => item.component);
            // const landing = await new this.landingModel({
            //     domain,
            //     title: body.company_name,
            //     seo_title: `Home | ${body.company_name}`,
            //     appearence: {},
            //     sections: []
            // });

            // await landing.save();
            // return landing;
        }
        catch(e) {
            throw new HttpException(e.message, e.status);
        }
    }

    async update(userId, body) {
        try {
            
        } catch(e) {
            throw new HttpException(e.message, e.status);
        }
    }
}
