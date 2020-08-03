
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface ISendEmailVerify {
    email: string;
    token: string;
    redirectUri: string;
    lang: string;
}
interface IResetPassword {
    name: string;
    email: string;
    token: string;
    redirectUri: string;
    lang: string;
}

interface IResetPasswordSuccess {
    email: string;
}

export default {
    async SendEmailVerify(data: ISendEmailVerify) {
        try {
            const activateUrl = `${process.env.BASE_URL}/v1.0/oauth/verify/email?token=${data.token}&redirect_uri=${data.redirectUri}&lang=${data.lang}`;
            await sgMail.send({
                to: `${data.email}`,
                from: process.env.EMAIL_SENDER ?? 'no_reply@thairathclassifieds.com',
                subject: 'Verify email SeuKhai',
                html: `<!DOCTYPE html
                PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html
                style="height:100%;width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;margin:0;">
            
            <head>
                <meta charset="UTF-8">
                <meta content="width=device-width, initial-scale=1" name="viewport">
                <meta name="x-apple-disable-message-reformatting">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta content="telephone=no" name="format-detection">
                <title>New email template 2020-05-21</title>
                <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]-->
                <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                <!--[if !mso]><!-- -->
                <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
                <!--<![endif]-->
                <style type="text/css">
                    @media only screen and (max-width:600px) {
            
                        p,
                        ul li,
                        ol li,
                        a {
                            font-size: 14px !important;
                            line-height: 150% !important
                        }
            
                        h1 {
                            font-size: 22px !important;
                            text-align: center;
                            line-height: 120% !important
                        }
            
                        h2 {
                            font-size: 20px !important;
                            text-align: center;
                            line-height: 120% !important
                        }
            
                        h3 {
                            font-size: 18px !important;
                            text-align: center;
                            line-height: 120% !important
                        }
            
                        h1 a {
                            font-size: 22px !important
                        }
            
                        h2 a {
                            font-size: 20px !important
                        }
            
                        h3 a {
                            font-size: 18px !important
                        }
            
                        .es-menu td a {
                            font-size: 13px !important
                        }
            
                        .es-header-body p,
                        .es-header-body ul li,
                        .es-header-body ol li,
                        .es-header-body a {
                            font-size: 13px !important
                        }
            
                        .es-footer-body p,
                        .es-footer-body ul li,
                        .es-footer-body ol li,
                        .es-footer-body a {
                            font-size: 13px !important
                        }
            
                        .es-infoblock p,
                        .es-infoblock ul li,
                        .es-infoblock ol li,
                        .es-infoblock a {
                            font-size: 11px !important
                        }
            
                        *[class="gmail-fix"] {
                            display: none !important
                        }
            
                        .es-m-txt-c,
                        .es-m-txt-c h1,
                        .es-m-txt-c h2,
                        .es-m-txt-c h3 {
                            text-align: center !important
                        }
            
                        .es-m-txt-r,
                        .es-m-txt-r h1,
                        .es-m-txt-r h2,
                        .es-m-txt-r h3 {
                            text-align: right !important
                        }
            
                        .es-m-txt-l,
                        .es-m-txt-l h1,
                        .es-m-txt-l h2,
                        .es-m-txt-l h3 {
                            text-align: left !important
                        }
            
                        .es-m-txt-r img,
                        .es-m-txt-c img,
                        .es-m-txt-l img {
                            display: inline !important
                        }
            
                        .es-button-border {
                            display: block !important
                        }
            
                        a.es-button {
                            font-size: 14px !important;
                            display: block !important;
                            border-left-width: 0px !important;
                            border-right-width: 0px !important
                        }
            
                        .es-btn-fw {
                            border-width: 10px 0px !important;
                            text-align: center !important
                        }
            
                        .es-adaptive table,
                        .es-btn-fw,
                        .es-btn-fw-brdr,
                        .es-left,
                        .es-right {
                            width: 100% !important
                        }
            
                        .es-content table,
                        .es-header table,
                        .es-footer table,
                        .es-content,
                        .es-footer,
                        .es-header {
                            width: 100% !important;
                            max-width: 600px !important
                        }
            
                        .es-adapt-td {
                            display: block !important;
                            width: 100% !important
                        }
            
                        .adapt-img {
                            width: 100% !important;
                            height: auto !important
                        }
            
                        .es-m-p0 {
                            padding: 0px !important
                        }
            
                        .es-m-p0r {
                            padding-right: 0px !important
                        }
            
                        .es-m-p0l {
                            padding-left: 0px !important
                        }
            
                        .es-m-p0t {
                            padding-top: 0px !important
                        }
            
                        .es-m-p0b {
                            padding-bottom: 0 !important
                        }
            
                        .es-m-p20b {
                            padding-bottom: 20px !important
                        }
            
                        .es-mobile-hidden,
                        .es-hidden {
                            display: none !important
                        }
            
                        .es-desk-hidden {
                            display: table-row !important;
                            width: auto !important;
                            overflow: visible !important;
                            float: none !important;
                            max-height: inherit !important;
                            line-height: inherit !important
                        }
            
                        .es-desk-menu-hidden {
                            display: table-cell !important
                        }
            
                        table.es-table-not-adapt,
                        .esd-block-html table {
                            width: auto !important
                        }
            
                        table.es-social {
                            display: inline-block !important
                        }
            
                        table.es-social td {
                            display: inline-block !important
                        }
                    }
            
                    #outlook a {
                        padding: 0;
                    }
            
                    .ExternalClass {
                        width: 100%;
                    }
            
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                        line-height: 100%;
                    }
            
                    .es-button {
                        mso-style-priority: 100 !important;
                        text-decoration: none !important;
                    }
            
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }
            
                    .es-desk-hidden {
                        display: none;
                        float: left;
                        overflow: hidden;
                        width: 0;
                        max-height: 0;
                        line-height: 0;
                        mso-hide: all;
                    }
                </style>
            </head>
            
            <body
                style="height:100%;width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;margin:0;">
                <div class="es-wrapper-color" style="background-color:#EFEFEF;height:100%;width:100%;">
                    <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#efefef"></v:fill> </v:background><![endif]-->
                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
                        style="background-color:#EFEFEF;height:100%;width:100%;mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;">
                        <tr style="border-collapse:collapse;">
                            <td valign="center" style="padding:0;margin:0;">
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;margin:0;">
                                            <table bgcolor="transparent" class="es-header-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;">
                                                <tr style="border-collapse:collapse;">
                                                    <td style="margin:0;padding-top:5px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#14B400;"
                                                        align="left" bgcolor="#14B400">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" valign="top" align="center"
                                                                    style="padding:0;margin:0;">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="center"
                                                                                style="padding:0;margin:0;padding-bottom:10px;font-size:0;">
                                                                                <a target="_blank" href="https://viewstripo.email/"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:14px;text-decoration:underline;color:#333333;"><img
                                                                                        src="https://seukhaistorage.blob.core.windows.net/general-assets/logo_email.JPG" alt
                                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;margin:0;">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                                                <tr style="border-collapse:collapse;">
                                                    <td align="left" bgcolor="#FFFFFF"
                                                        style="padding:0;margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#FFFFFF;">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" class="es-m-p20b" align="left"
                                                                    style="padding:0;margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="center"
                                                                                style="padding:0;margin:0;font-size:0px;">
                                                                                <img class="adapt-img" src="https://seukhaistorage.blob.core.windows.net/general-assets/activate_account_email.JPG" alt
                                                                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;margin:0;">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                                                <tr style="border-collapse:collapse;">
                                                    <td align="left"
                                                        style="padding:0;margin:0;padding-top:20px;padding-left:20px;padding-right:20px;">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" align="center" valign="top"
                                                                    style="padding:0;margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="left" style="padding:0;margin:0;">
                                                                                <p
                                                                                    style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#444444;">
                                                                                    ในการเปิดใช้งานบัญชีของคุณโปรดคลิกลิงก์ด้านล่าง
                                                                                    เพื่อให้เรามั่นใจได้ว่าที่อยู่อีเมลนี้เป็นของคุณ:
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" align="center" valign="top"
                                                                    style="padding:0;margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="left"
                                                                                style="padding:0;margin:0;padding-top:10px;padding-bottom:30px;">
                                                                                <a href="${activateUrl}" style="text-decoration: none;"><p
                                                                                    style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#14B400;">
                                                                                    เปิดใช้งานบัญชีของคุณ</p></a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" align="center" valign="top"
                                                                    style="padding:0;margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="left"
                                                                                style="padding:0;margin:0;padding-bottom:15px;">
                                                                                <p
                                                                                    style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#444444;">
                                                                                    หากลิงก์นี้ใช้งานไม่ได้ด้วยเหตุผลบางอย่าง
                                                                                    กรุณายืนยันที่อยู่อีเมลของคุณด้วยการ
                                                                                    คัดลอกและวางลิงค์ต่อไปนี้ลงในเบราว์เซอร์ของคุณ :
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;margin:0;">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                                                <tr style="border-collapse:collapse;">
                                                    <td align="left"
                                                        style="padding:0;margin:0;padding-top:20px;padding-left:20px;padding-right:20px;">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" align="center" valign="top"
                                                                    style="padding:0;margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="left" style="padding:0;margin:0;">
                                                                            <p style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#14B400;overflow-wrap: break-word;
                                                                            word-wrap: break-word;
                                                                          
                                                                            -ms-word-break: break-all;
                                                                            /* This is the dangerous one in WebKit, as it breaks things wherever */
                                                                            word-break: break-all;
                                                                            /* Instead use this non-standard one: */
                                                                            word-break: break-word;">
                                                                                    ${activateUrl}</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;margin:0;">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                                                <tr style="border-collapse:collapse;">
                                                    <td align="left"
                                                        style="padding:0;margin:0;padding-top:20px;padding-left:20px;padding-right:20px;">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" align="center" valign="top"
                                                                    style="padding:0;margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="left"
                                                                                style="padding:0;margin:0;padding-bottom:5px;">
                                                                                <p
                                                                                    style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#444444;">
                                                                                    ขอบคุณค่ะ/ครับ</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" align="center" valign="top"
                                                                    style="padding:0;margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="left" style="padding:0;margin:0;">
                                                                                <p
                                                                                    style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#444444;">
                                                                                    ทีมงานเว็บไซต์ซื้อขาย</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;margin:0;">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                                                <tr style="border-collapse:collapse;">
                                                    <td align="left"
                                                        style="padding:0;margin:0;padding-top:20px;padding-left:20px;padding-right:20px;">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" align="center" valign="top"
                                                                    style="padding:0;margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="left" style="padding:0;margin:0;">
                                                                                <p
                                                                                    style="margin:20px 0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#444444;">
                                                                                    หากคุณไม่ต้องการบัญชีของคุณอีกต่อไปหรือหากคุณเชื่อว่าข้อความนี้ส่งโดยไม่ได้ตั้งใจ
                                                                                    โปรดเพิกเฉยต่ออีเมลนี้</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame"
                                                                                align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center"
                                                                                                class="esd-block-text">
                                                                                                <p
                                                                                                    style="color: #444444; line-height: 120%; font-size: 14px;">
                                                                                                    หากคุณไม่ต้องการบัญชีของคุณอีกต่อไปหรือหากคุณเชื่อว่าข้อความนี้ส่งโดยไม่ได้ตั้งใจ<br>
                                                                                                    โปรดเพิกเฉยต่ออีเมลนี้</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="margin-top: 20px;">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame"
                                                                                align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr class="es-visible-simple-html-only">
                                                                                            <td align="center"
                                                                                                class="esd-block-social es-infoblock"
                                                                                                style="font-size:0">
                                                                                                <table cellpadding="0"
                                                                                                    cellspacing="0"
                                                                                                    class="es-table-not-adapt es-social"
                                                                                                    style="width: 22%;">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td align="center"
                                                                                                                valign="top"
                                                                                                                class="es-p20r"><a
                                                                                                                    target="_blank"
                                                                                                                    href="${ process.env.FACEBOOK_URL}"><img
                                                                                                                        title="Facebook"
                                                                                                                        src="https://heqnuz.stripocdn.email/content/assets/img/social-icons/circle-gray/facebook-circle-gray.png"
                                                                                                                        alt="Fb"
                                                                                                                        width="32"></a>
                                                                                                            </td>
                                                                                                            <td align="center"
                                                                                                                valign="top"
                                                                                                                class="es-p20r"><a
                                                                                                                    target="_blank"
                                                                                                                    href="${ process.env.INSTAGRAM_URL}"><img
                                                                                                                        title="Instagram"
                                                                                                                        src="https://heqnuz.stripocdn.email/content/assets/img/social-icons/circle-gray/instagram-circle-gray.png"
                                                                                                                        alt="Inst"
                                                                                                                        width="32"></a>
                                                                                                            </td>
                                                                                                            <td align="center"
                                                                                                                valign="top"
                                                                                                                esd-tmp-icon-type="email">
                                                                                                                <a target="_blank"
                                                                                                                    href="mailto:${ process.env.EMAIL_SUPPORT}"><img
                                                                                                                        title="Email"
                                                                                                                        src="https://heqnuz.stripocdn.email/content/assets/img/other-icons/circle-gray/mail-circle-gray.png"
                                                                                                                        alt="Email"
                                                                                                                        width="32"></a>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame"
                                                                                align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center"
                                                                                                class="esd-block-text">
                                                                                                <p
                                                                                                    style="color: #444444; line-height: 120%; font-size: 12px;">
                                                                                                    ทีมงานเว็บไซต์ซื้อขาย</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
            
            </html>`
            });
            return { success: true };
        } catch (error) {
            return { error: error };
        }
    },

    async SendEmailResetPassword(data: IResetPassword) {
        try {
            const url = `${process.env.BASE_URL}/v1.0/oauth/reset-password?token=${data.token}&redirect_uri=${data.redirectUri}&lang=${data.lang}`
            await sgMail.send({
                to: `${data.email}`,
                from: process.env.EMAIL_SENDER ?? 'no_reply@thairathclassifieds.com',
                subject: 'Reset password email SeuKhai',
                html: `<!DOCTYPE html
                PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html
                style="height:100%;width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
            
            <head>
                <meta charset="UTF-8">
                <meta content="width=device-width, initial-scale=1" name="viewport">
                <meta name="x-apple-disable-message-reformatting">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta content="telephone=no" name="format-detection">
                <title>New email template 2020-05-21</title>
                <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]-->
                <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                <!--[if !mso]><!-- -->
                <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
                <!--<![endif]-->
                <style type="text/css">
                    @media only screen and (max-width:600px) {
            
                        p,
                        ul li,
                        ol li,
                        a {
                            font-size: 14px !important;
                            line-height: 150% !important
                        }
            
                        h1 {
                            font-size: 22px !important;
                            text-align: center;
                            line-height: 120% !important
                        }
            
                        h2 {
                            font-size: 20px !important;
                            text-align: center;
                            line-height: 120% !important
                        }
            
                        h3 {
                            font-size: 18px !important;
                            text-align: center;
                            line-height: 120% !important
                        }
            
                        h1 a {
                            font-size: 22px !important
                        }
            
                        h2 a {
                            font-size: 20px !important
                        }
            
                        h3 a {
                            font-size: 18px !important
                        }
            
                        .es-menu td a {
                            font-size: 13px !important
                        }
            
                        .es-header-body p,
                        .es-header-body ul li,
                        .es-header-body ol li,
                        .es-header-body a {
                            font-size: 13px !important
                        }
            
                        .es-footer-body p,
                        .es-footer-body ul li,
                        .es-footer-body ol li,
                        .es-footer-body a {
                            font-size: 13px !important
                        }
            
                        .es-infoblock p,
                        .es-infoblock ul li,
                        .es-infoblock ol li,
                        .es-infoblock a {
                            font-size: 11px !important
                        }
            
                        *[class="gmail-fix"] {
                            display: none !important
                        }
            
                        .es-m-txt-c,
                        .es-m-txt-c h1,
                        .es-m-txt-c h2,
                        .es-m-txt-c h3 {
                            text-align: center !important
                        }
            
                        .es-m-txt-r,
                        .es-m-txt-r h1,
                        .es-m-txt-r h2,
                        .es-m-txt-r h3 {
                            text-align: right !important
                        }
            
                        .es-m-txt-l,
                        .es-m-txt-l h1,
                        .es-m-txt-l h2,
                        .es-m-txt-l h3 {
                            text-align: left !important
                        }
            
                        .es-m-txt-r img,
                        .es-m-txt-c img,
                        .es-m-txt-l img {
                            display: inline !important
                        }
            
                        .es-button-border {
                            display: block !important
                        }
            
                        a.es-button {
                            font-size: 14px !important;
                            display: block !important;
                            border-left-width: 0px !important;
                            border-right-width: 0px !important
                        }
            
                        .es-btn-fw {
                            border-width: 10px 0px !important;
                            text-align: center !important
                        }
            
                        .es-adaptive table,
                        .es-btn-fw,
                        .es-btn-fw-brdr,
                        .es-left,
                        .es-right {
                            width: 100% !important
                        }
            
                        .es-content table,
                        .es-header table,
                        .es-footer table,
                        .es-content,
                        .es-footer,
                        .es-header {
                            width: 100% !important;
                            max-width: 600px !important
                        }
            
                        .es-adapt-td {
                            display: block !important;
                            width: 100% !important
                        }
            
                        .adapt-img {
                            width: 100% !important;
                            height: auto !important
                        }
            
                        .es-m-p0 {
                            padding: 0px !important
                        }
            
                        .es-m-p0r {
                            padding-right: 0px !important
                        }
            
                        .es-m-p0l {
                            padding-left: 0px !important
                        }
            
                        .es-m-p0t {
                            padding-top: 0px !important
                        }
            
                        .es-m-p0b {
                            padding-bottom: 0 !important
                        }
            
                        .es-m-p20b {
                            padding-bottom: 20px !important
                        }
            
                        .es-mobile-hidden,
                        .es-hidden {
                            display: none !important
                        }
            
                        .es-desk-hidden {
                            display: table-row !important;
                            width: auto !important;
                            overflow: visible !important;
                            float: none !important;
                            max-height: inherit !important;
                            line-height: inherit !important
                        }
            
                        .es-desk-menu-hidden {
                            display: table-cell !important
                        }
            
                        table.es-table-not-adapt,
                        .esd-block-html table {
                            width: auto !important
                        }
            
                        table.es-social {
                            display: inline-block !important
                        }
            
                        table.es-social td {
                            display: inline-block !important
                        }
                    }
            
                    #outlook a {
                        padding: 0;
                    }
            
                    .ExternalClass {
                        width: 100%;
                    }
            
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                        line-height: 100%;
                    }
            
                    .es-button {
                        mso-style-priority: 100 !important;
                        text-decoration: none !important;
                    }
            
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }
            
                    .es-desk-hidden {
                        display: none;
                        float: left;
                        overflow: hidden;
                        width: 0;
                        max-height: 0;
                        line-height: 0;
                        mso-hide: all;
                    }
                </style>
            </head>
            
            <body
                style="height:100%;width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
                <div class="es-wrapper-color" style="background-color:#EFEFEF;height:100%;width:100%;">
                    <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#efefef"></v:fill> </v:background><![endif]-->
                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
                        style="background-color:#EFEFEF;height:100%;width:100%;mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;">
                        <tr style="border-collapse:collapse;">
                            <td valign="center" style="padding:0;Margin:0;">
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;Margin:0;">
                                            <table bgcolor="transparent" class="es-header-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;">
                                                <tr style="border-collapse:collapse;">
                                                    <td style="Margin:0;padding-top:5px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#14B400;"
                                                        align="left" bgcolor="#14B400">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" valign="top" align="center"
                                                                    style="padding:0;Margin:0;">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="center"
                                                                                style="padding:0;Margin:0;padding-bottom:10px;font-size:0;">
                                                                                <a target="_blank" href="https://viewstripo.email/"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:14px;text-decoration:underline;color:#333333;"><img
                                                                                        src="https://seukhaistorage.blob.core.windows.net/general-assets/logo_email.JPG"
                                                                                        alt
                                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;Margin:0;">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                                                <tr style="border-collapse:collapse;">
                                                    <td align="left" bgcolor="#FFFFFF"
                                                        style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#FFFFFF;">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" class="es-m-p20b" align="left"
                                                                    style="padding:0;Margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="center"
                                                                                style="padding:0;Margin:0;font-size:0px;">
                                                                                <img class="adapt-img"
                                                                                    src="https://seukhaistorage.blob.core.windows.net/general-assets/reset_password_email.svg"
                                                                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;Margin:0;">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                                                <tr style="border-collapse:collapse;">
                                                    <td align="left"
                                                        style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" align="center" valign="top"
                                                                    style="padding:0;Margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="left" style="padding:0;Margin:0;">
                                                                                <p
                                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#444444;">
                                                                                    สวัสดีคุณ ${data.name}</p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="left"
                                                                                style="padding:0;Margin:0;padding-top:15px;">
                                                                                <p
                                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#444444;">
                                                                                    เราเพิ่งได้รับคำขอให้ตั้งรหัสผ่านใหม่สำหรับบัญชีของคุณ
                                                                                    คลิกที่ลิงก์ด้านล่าง เพื่อรีเซ็ตรหัสผ่านของคุณ
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" align="center" valign="top"
                                                                    style="padding:0;Margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="left"
                                                                                style="padding:0;Margin:0;padding-top:10px;padding-bottom:30px;">
                                                                                <a href="${url}"
                                                                                    style="text-decoration: none;">
                                                                                    <p
                                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#14B400;">
                                                                                        รีเซ็ตรหัสผ่าน</p>
            
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" align="center" valign="top"
                                                                    style="padding:0;Margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="left"
                                                                                style="padding:0;Margin:0;padding-bottom:15px;">
                                                                                <p
                                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#444444;">
                                                                                    หรือคัดลอกและวางลิงก์นี้ลงในเบราว์เซอร์ของคุณ
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;Margin:0;">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                                                <tr style="border-collapse:collapse;">
                                                    <td align="left"
                                                        style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" align="center" valign="top"
                                                                    style="padding:0;Margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="left" style="padding:0;Margin:0;">
                                                                                <p style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#14B400;overflow-wrap: break-word;
                                                                                word-wrap: break-word;
                                                                              
                                                                                -ms-word-break: break-all;
                                                                                /* This is the dangerous one in WebKit, as it breaks things wherever */
                                                                                word-break: break-all;
                                                                                /* Instead use this non-standard one: */
                                                                                word-break: break-word;">
                                                                                    ${url}</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame"
                                                                                align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center"
                                                                                                class="esd-block-text">
                                                                                                <p
                                                                                                    style="color: #444444; line-height: 120%; font-size: 14px;">
                                                                                                    โปรดทราบ:
                                                                                                    ลิงค์นี้สามารถใช้ได้เพียงครั้งเดียวและจะไม่สามารถใช้งานได้ใน
                                                                                                    24 ชั่วโมง<br>
                                                                                                    หากคุณไม่ได้พยายามรีเซ็ตรหัสผ่านกรุณาเพิกเฉยต่อข้อความนี้
                                                                                                </p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="margin-top: 20px;">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame"
                                                                                align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr class="es-visible-simple-html-only">
                                                                                            <td align="center"
                                                                                                class="esd-block-social es-infoblock"
                                                                                                style="font-size:0">
                                                                                                <table cellpadding="0"
                                                                                                    cellspacing="0"
                                                                                                    class="es-table-not-adapt es-social"
                                                                                                    style="width: 22%;">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                        <td align="center"
                                                                                                        valign="top"
                                                                                                        class="es-p20r"><a
                                                                                                            target="_blank"
                                                                                                            href="${ process.env.FACEBOOK_URL}"><img
                                                                                                                title="Facebook"
                                                                                                                src="https://heqnuz.stripocdn.email/content/assets/img/social-icons/circle-gray/facebook-circle-gray.png"
                                                                                                                alt="Fb"
                                                                                                                width="32"></a>
                                                                                                    </td>
                                                                                                    <td align="center"
                                                                                                        valign="top"
                                                                                                        class="es-p20r"><a
                                                                                                            target="_blank"
                                                                                                            href="${ process.env.INSTAGRAM_URL}"><img
                                                                                                                title="Instagram"
                                                                                                                src="https://heqnuz.stripocdn.email/content/assets/img/social-icons/circle-gray/instagram-circle-gray.png"
                                                                                                                alt="Inst"
                                                                                                                width="32"></a>
                                                                                                    </td>
                                                                                                    <td align="center"
                                                                                                        valign="top"
                                                                                                        esd-tmp-icon-type="email">
                                                                                                        <a target="_blank"
                                                                                                            href="mailto:${ process.env.EMAIL_SUPPORT}"><img
                                                                                                                title="Email"
                                                                                                                src="https://heqnuz.stripocdn.email/content/assets/img/other-icons/circle-gray/mail-circle-gray.png"
                                                                                                                alt="Email"
                                                                                                                width="32"></a>
                                                                                                    </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame"
                                                                                align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center"
                                                                                                class="esd-block-text">
                                                                                                <p
                                                                                                    style="color: #444444; line-height: 120%; font-size: 12px;">
                                                                                                    ทีมงานเว็บไซต์ซื้อขาย</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
            
            </html>`
            })
            return { success: true };
        } catch (error) {
            return { error: error };
        }

    },

    async SendEmailResetPasswordSuccess(data: IResetPasswordSuccess) {
        try {
            await sgMail.send({
                to: `${data.email}`,
                from: process.env.EMAIL_SENDER ?? 'no_reply@thairathclassifieds.com',
                subject: 'Reset password email SeuKhai',
                html: `<!DOCTYPE html
                PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html
                style="height:100%;width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
            
            <head>
                <meta charset="UTF-8">
                <meta content="width=device-width, initial-scale=1" name="viewport">
                <meta name="x-apple-disable-message-reformatting">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta content="telephone=no" name="format-detection">
                <title>New email template 2020-05-21</title>
                <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]-->
                <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                <!--[if !mso]><!-- -->
                <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
                <!--<![endif]-->
                <style type="text/css">
                    @media only screen and (max-width:600px) {
            
                        p,
                        ul li,
                        ol li,
                        a {
                            font-size: 14px !important;
                            line-height: 150% !important
                        }
            
                        h1 {
                            font-size: 22px !important;
                            text-align: center;
                            line-height: 120% !important
                        }
            
                        h2 {
                            font-size: 20px !important;
                            text-align: center;
                            line-height: 120% !important
                        }
            
                        h3 {
                            font-size: 18px !important;
                            text-align: center;
                            line-height: 120% !important
                        }
            
                        h1 a {
                            font-size: 22px !important
                        }
            
                        h2 a {
                            font-size: 20px !important
                        }
            
                        h3 a {
                            font-size: 18px !important
                        }
            
                        .es-menu td a {
                            font-size: 13px !important
                        }
            
                        .es-header-body p,
                        .es-header-body ul li,
                        .es-header-body ol li,
                        .es-header-body a {
                            font-size: 13px !important
                        }
            
                        .es-footer-body p,
                        .es-footer-body ul li,
                        .es-footer-body ol li,
                        .es-footer-body a {
                            font-size: 13px !important
                        }
            
                        .es-infoblock p,
                        .es-infoblock ul li,
                        .es-infoblock ol li,
                        .es-infoblock a {
                            font-size: 11px !important
                        }
            
                        *[class="gmail-fix"] {
                            display: none !important
                        }
            
                        .es-m-txt-c,
                        .es-m-txt-c h1,
                        .es-m-txt-c h2,
                        .es-m-txt-c h3 {
                            text-align: center !important
                        }
            
                        .es-m-txt-r,
                        .es-m-txt-r h1,
                        .es-m-txt-r h2,
                        .es-m-txt-r h3 {
                            text-align: right !important
                        }
            
                        .es-m-txt-l,
                        .es-m-txt-l h1,
                        .es-m-txt-l h2,
                        .es-m-txt-l h3 {
                            text-align: left !important
                        }
            
                        .es-m-txt-r img,
                        .es-m-txt-c img,
                        .es-m-txt-l img {
                            display: inline !important
                        }
            
                        .es-button-border {
                            display: block !important
                        }
            
                        a.es-button {
                            font-size: 14px !important;
                            display: block !important;
                            border-left-width: 0px !important;
                            border-right-width: 0px !important
                        }
            
                        .es-btn-fw {
                            border-width: 10px 0px !important;
                            text-align: center !important
                        }
            
                        .es-adaptive table,
                        .es-btn-fw,
                        .es-btn-fw-brdr,
                        .es-left,
                        .es-right {
                            width: 100% !important
                        }
            
                        .es-content table,
                        .es-header table,
                        .es-footer table,
                        .es-content,
                        .es-footer,
                        .es-header {
                            width: 100% !important;
                            max-width: 600px !important
                        }
            
                        .es-adapt-td {
                            display: block !important;
                            width: 100% !important
                        }
            
                        .adapt-img {
                            width: 100% !important;
                            height: auto !important
                        }
            
                        .es-m-p0 {
                            padding: 0px !important
                        }
            
                        .es-m-p0r {
                            padding-right: 0px !important
                        }
            
                        .es-m-p0l {
                            padding-left: 0px !important
                        }
            
                        .es-m-p0t {
                            padding-top: 0px !important
                        }
            
                        .es-m-p0b {
                            padding-bottom: 0 !important
                        }
            
                        .es-m-p20b {
                            padding-bottom: 20px !important
                        }
            
                        .es-mobile-hidden,
                        .es-hidden {
                            display: none !important
                        }
            
                        .es-desk-hidden {
                            display: table-row !important;
                            width: auto !important;
                            overflow: visible !important;
                            float: none !important;
                            max-height: inherit !important;
                            line-height: inherit !important
                        }
            
                        .es-desk-menu-hidden {
                            display: table-cell !important
                        }
            
                        table.es-table-not-adapt,
                        .esd-block-html table {
                            width: auto !important
                        }
            
                        table.es-social {
                            display: inline-block !important
                        }
            
                        table.es-social td {
                            display: inline-block !important
                        }
                    }
            
                    #outlook a {
                        padding: 0;
                    }
            
                    .ExternalClass {
                        width: 100%;
                    }
            
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                        line-height: 100%;
                    }
            
                    .es-button {
                        mso-style-priority: 100 !important;
                        text-decoration: none !important;
                    }
            
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }
            
                    .es-desk-hidden {
                        display: none;
                        float: left;
                        overflow: hidden;
                        width: 0;
                        max-height: 0;
                        line-height: 0;
                        mso-hide: all;
                    }
                </style>
            </head>
            
            <body
                style="height:100%;width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
                <div class="es-wrapper-color" style="background-color:#EFEFEF;height:100%;width:100%;">
                    <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#efefef"></v:fill> </v:background><![endif]-->
                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
                        style="background-color:#EFEFEF;height:100%;width:100%;mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;">
                        <tr style="border-collapse:collapse;">
                            <td style="padding:0;Margin:0;">
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;Margin:0;">
                                            <table bgcolor="transparent" class="es-header-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;">
                                                <tr style="border-collapse:collapse;">
                                                    <td style="Margin:0;padding-top:5px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#14B400;"
                                                        align="left" bgcolor="#14B400">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" valign="top" align="center"
                                                                    style="padding:0;Margin:0;">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="center"
                                                                                style="padding:0;Margin:0;font-size:0;">
                                                                                <a target="_blank" href="https://viewstripo.email/"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:14px;text-decoration:underline;color:#333333;"><img
                                                                                        src="https://seukhaistorage.blob.core.windows.net/general-assets/logo_email.JPG"
                                                                                        alt
                                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                    <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;Margin:0;">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                                                <tr style="border-collapse:collapse;">
                                                    <td align="left" bgcolor="#FFFFFF"
                                                        style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#FFFFFF;">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                            <tr style="border-collapse:collapse;">
                                                                <td width="560" class="es-m-p20b" align="left"
                                                                    style="padding:0;Margin:0;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                        <tr style="border-collapse:collapse;">
                                                                            <td align="center"
                                                                                style="padding:0;Margin:0;font-size:0px;">
                                                                                <img class="adapt-img"
                                                                                    src="https://seukhaistorage.blob.core.windows.net/general-assets/password_changed_email.svg"
                                                                                    alt
                                                                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                                    cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame"
                                                                                align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center"
                                                                                                class="esd-block-text es-p10">
                                                                                                <p
                                                                                                    style="font-size: 16px; color: #444444;line-height: 1.8;">
                                                                                                    คุณได้ทำการเปลี่ยนรหัสผ่านเรียบร้อยแล้ว
                                                                                                </p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame"
                                                                                align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center"
                                                                                                class="esd-block-text">
                                                                                                <p
                                                                                                    style="color: #444444; line-height: 120%; font-size: 14px;">
                                                                                                    หากคุณไม่ได้ทำการเปลี่ยนรหัสผ่านของคุณ
                                                                                                    กรุณา <span
                                                                                                        style="color:#14B400;"><a
                                                                                                            href="<%= notificationURL %>">คลิกที่นี่</a></span>
                                                                                                    เพื่อติดต่อเรา</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
            
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="margin-top: 20px;">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame"
                                                                                align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr class="es-visible-simple-html-only">
                                                                                            <td align="center"
                                                                                                class="esd-block-social es-infoblock"
                                                                                                style="font-size:0">
                                                                                                <table cellpadding="0"
                                                                                                    cellspacing="0"
                                                                                                    class="es-table-not-adapt es-social"
                                                                                                    style="width: 22%;">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td align="center"
                                                                                                                valign="top"
                                                                                                                class="es-p20r"><a
                                                                                                                    target="_blank"
                                                                                                                    href="${ process.env.FACEBOOK_URL}"><img
                                                                                                                        title="Facebook"
                                                                                                                        src="https://heqnuz.stripocdn.email/content/assets/img/social-icons/circle-gray/facebook-circle-gray.png"
                                                                                                                        alt="Fb"
                                                                                                                        width="32"></a>
                                                                                                            </td>
                                                                                                            <td align="center"
                                                                                                                valign="top"
                                                                                                                class="es-p20r"><a
                                                                                                                    target="_blank"
                                                                                                                    href="${ process.env.INSTAGRAM_URL}"><img
                                                                                                                        title="Instagram"
                                                                                                                        src="https://heqnuz.stripocdn.email/content/assets/img/social-icons/circle-gray/instagram-circle-gray.png"
                                                                                                                        alt="Inst"
                                                                                                                        width="32"></a>
                                                                                                            </td>
                                                                                                            <td align="center"
                                                                                                                valign="top"
                                                                                                                esd-tmp-icon-type="email">
                                                                                                                <a target="_blank"
                                                                                                                    href="mailto:${ process.env.EMAIL_SUPPORT}"><img
                                                                                                                        title="Email"
                                                                                                                        src="https://heqnuz.stripocdn.email/content/assets/img/other-icons/circle-gray/mail-circle-gray.png"
                                                                                                                        alt="Email"
                                                                                                                        width="32"></a>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame"
                                                                                align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center"
                                                                                                class="esd-block-text">
                                                                                                <p
                                                                                                    style="color: #444444; line-height: 120%; font-size: 12px;">
                                                                                                    ทีมงานเว็บไซต์ซื้อขาย</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
            
            </html>`
            })
            return { success: true };
        } catch (error) {
            return { error: error };
        }
    }
}