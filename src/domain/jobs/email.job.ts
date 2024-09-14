import cron from 'node-cron';
import { EmailService } from '../services/email.service';
import { generateMonoEmailTemplate } from '../templates/email.template';
import { monoModel } from '../../data/models/mono.model';

export const emailJob = () => {

    const emailService = new EmailService();

    cron.schedule("*/10 * * * * *",async ()=>{
        try {
            const monos = await monoModel.find({ isSend:false });
            if (!monos.length) {
                console.log("No hay casos pendientes por enviar");
                return;
            }

            console.log(`Procesando casos: ${monos.length}`)
            await Promise.all(
                monos.map(async (mono)=>{
                    console.log(mono);
                    try {
                        const htmlBody = generateMonoEmailTemplate(
                            mono.lat,
                            mono.lng,
                            mono.genre,
                            mono.age
                        )
                        await emailService.sendEmail({
                            to:"danielisaisal@gmail.com",
                            subject:`Nuevo: ${mono.creationDate}`,
                            htmlBody:htmlBody
                        });
                        console.log(`Email enviado para el caso de viruela del mono con Id: ${mono._id}`)
                        let updateMono = {
                            lat: mono.lat,
                            lng: mono.lng,
                            isSend: true,
                            genre: mono.genre,
                            age: mono.age,
                            creationDate: mono.creationDate
                        };
                        await monoModel.findByIdAndUpdate(mono._id, updateMono);
                        console.log(`Caso actualizado para el Id: ${mono._id}`)
                    }
                    catch (error) {
                        console.error("Error al procesar el caso");
                    }
                })
            );
        } catch (error) {
            console.error("Error durante el envio de correos");
        }
    });
};