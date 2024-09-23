import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Landing, LandingDocument } from './schemas/landing.schema';
import { AiService } from 'src/ai/ai.service';

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
                type: 'file',
                accept: "image/png, image/jpeg, image/webp, image/svg",
                messages: [
                    "Дякую! Чи маєте Ви логотип, який слід використовувати на сторінці? Будь ласка, завантажте його тут або надішліть посилання для завантаження.",
                ],
                can_skip: true
            },
            {
                name: "brandbook",
                type: 'file',
                accept: ".pdf, .doc, .docx",
                messages: [
                    "Дякую! Чи є у Вас брендбук, який містить стильові керівництва для вашого бренду?",
                ],
                can_skip: true
            }
        ];
    }

    async create(userId, body) {
        try {
            // console.log(userId, body);

            if (!userId) {
                throw new HttpException('user_id_empty', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            if (!body?.title?.length) {
                throw new HttpException('error', HttpStatus.BAD_REQUEST);
            }

            const landing = await new this.landingModel({
                domain: body.title.toLowerCase(),
                title: body.title,
                seo_title: `Home | ${body.title}`,
                appearence: {},
                sections: []
            });

            await landing.save();
            return landing;
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
