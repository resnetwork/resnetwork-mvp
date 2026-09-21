import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApprovalEmail(toEmail: string, name: string, password: string = 'admin') {
  try {
    const { data, error } = await resend.emails.send({
      from: 'RES Network <hello@resnetwork.org>',
      to: [toEmail],
      subject: 'Доступ к платформе RES Network открыт!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #04110a; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #10b981;">
          <h1 style="color: #10b981; text-align: center;">Добро пожаловать в RES Network!</h1>
          
          <p style="font-size: 16px; line-height: 1.5; color: #d1d5db;">
            Здравствуйте, <strong>${name}</strong>!
          </p>
          
          <p style="font-size: 16px; line-height: 1.5; color: #d1d5db;">
            Ваша заявка на регистрацию в экосистеме <strong>RES Network</strong> была успешно одобрена администратором.
          </p>
          
          <div style="background-color: #06241a; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10b981;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #9ca3af; text-transform: uppercase;">Ваши данные для входа:</p>
            <p style="margin: 5px 0; font-size: 16px;">
              <strong>Email:</strong> ${toEmail}
            </p>
            <p style="margin: 5px 0; font-size: 16px;">
              <strong>Пароль:</strong> ${password}
            </p>
          </div>
          
          <p style="font-size: 14px; color: #9ca3af; margin-bottom: 30px;">
            В целях безопасности рекомендуем сменить пароль в личном кабинете после первого входа.
          </p>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXTAUTH_URL || 'https://resnetwork.org'}/res365" style="display: inline-block; padding: 12px 24px; background-color: #10b981; color: #000000; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 16px;">
              Войти на платформу
            </a>
          </div>
          
          <hr style="border-color: #064e3b; margin: 40px 0 20px 0;" />
          
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            С уважением,<br />Команда RES Network
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Ошибка отправки email (Resend API):', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    return { success: false, error };
  }
}

export async function sendPasswordChangeEmail(toEmail: string, newPassword: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'RES Network <hello@resnetwork.org>',
      to: [toEmail],
      subject: 'Ваш пароль был изменен',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #04110a; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #10b981;">
          <h1 style="color: #10b981; text-align: center;">RES Network - Смена пароля</h1>
          
          <p style="font-size: 16px; line-height: 1.5; color: #d1d5db;">
            Здравствуйте!
          </p>
          
          <p style="font-size: 16px; line-height: 1.5; color: #d1d5db;">
            Вы успешно изменили свой пароль для доступа к платформе <strong>RES Network</strong>.
          </p>
          
          <div style="background-color: #06241a; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10b981;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #9ca3af; text-transform: uppercase;">Новые данные для входа:</p>
            <p style="margin: 5px 0; font-size: 16px;">
              <strong>Email:</strong> ${toEmail}
            </p>
            <p style="margin: 5px 0; font-size: 16px;">
              <strong>Пароль:</strong> ${newPassword}
            </p>
          </div>
          
          <p style="font-size: 14px; color: #9ca3af; margin-bottom: 30px;">
            Если вы не меняли пароль, пожалуйста, немедленно свяжитесь с поддержкой.
          </p>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXTAUTH_URL || 'https://resnetwork.org'}/res365" style="display: inline-block; padding: 12px 24px; background-color: #10b981; color: #000000; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 16px;">
              Войти на платформу
            </a>
          </div>
          
          <hr style="border-color: #064e3b; margin: 40px 0 20px 0;" />
          
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            С уважением,<br />Команда RES Network
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Ошибка отправки email о смене пароля:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Ошибка отправки email о смене пароля:', error);
    return { success: false, error };
  }
}

