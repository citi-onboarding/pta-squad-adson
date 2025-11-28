export const mailTemplate = (
  tutorName: string, 
  patientName: string, 
  appointmentDate: string, 
  appointmentTime: string
): string => {
  
  // Cor principal solicitada
  const primaryColor = '#7D1AD7';
  
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmação de Consulta</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; }
        .header { text-align: center; border-bottom: 2px solid ${primaryColor}; padding-bottom: 20px; margin-bottom: 20px; }
        .title { color: ${primaryColor}; font-size: 24px; font-weight: bold; margin: 0; }
        .content { color: #555555; line-height: 1.6; font-size: 16px; }
        .info-box { background-color: #f8f4fd; border-left: 5px solid ${primaryColor}; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .info-item { margin: 8px 0; color: #333; }
        .footer { text-align: center; font-size: 12px; color: #aaaaaa; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        
        <div class="header">
          <h1 class="title">Consulta Agendada</h1>
        </div>

        <div class="content">
          <p>Olá, <strong>${tutorName}</strong>.</p>
          
          <p>A consulta de <strong>${patientName}</strong> foi confirmada com sucesso.</p>
          
          <div class="info-box">
            <p class="info-item"><strong>Paciente:</strong> ${patientName}</p>
            <p class="info-item"><strong>Data:</strong> ${appointmentDate}</p>
            <p class="info-item"><strong>Horário:</strong> ${appointmentTime}</p>
          </div>

          <p>Por favor, chegue com 10 minutos de antecedência. Caso precise remarcar, entre em contato conosco.</p>
        </div>

        <div class="footer">
          <p>Mensagem automática do sistema.<br>Não responda a este e-mail.</p>
        </div>

      </div>
    </body>
    </html>
  `;
};