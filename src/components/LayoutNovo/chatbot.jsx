import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {

    !function(s,i,o,c){var a,p,u,h=[],l=[];function e(){var t="2";try{if(!c)throw new Error(t);var e,n="https://cnd-bot.metasix.solutions/v5/",r="metasix";if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var s=i.getElementsByTagName("script")[0],o=i.createElement("script");o.async=!0;var a=c.match(/([0-9]+)\.?([0-9]+)?\.?([0-9]+)?/),p=a&&a[1];if(a&&a[3])o.src=n+r+"."+c+".min.js";else{if(!(1<=p&&e["v"+p]))throw new Error(t);o.src=e["v"+p]}s.parentNode.insertBefore(o,s)}}catch(e){e.message===t&&console.error(e)}}s[o]={init:function(){a=arguments;var t={then:function(e){return l.push({type:"t",next:e}),t},catch:function(e){return l.push({type:"c",next:e}),t}};return t},on:function(){h.push(arguments)},render:function(){p=arguments},destroy:function(){u=arguments}},s.__onWebMessengerHostReady__=function(e){if(delete s.__onWebMessengerHostReady__,s[o]=e,a)for(var t=e.init.apply(e,a),n=0;n<l.length;n++){var r=l[n];t="t"===r.type?t.then(r.next):t.catch(r.next)}p&&e.render.apply(e,p),u&&e.destroy.apply(e,u);for(n=0;n<h.length;n++)e.on.apply(e,h[n])};var t=new XMLHttpRequest;t.addEventListener("load",e),t.open("GET","https://cnd-bot.metasix.solutions/v5/loader.json",!0),t.responseType="json",t.send()}(window,document,"Metasix","2");
  
    var initPromise = window.Metasix.init({
      integrationId: '6674209161d1159b24c9cca3',
      browserStorage: 'sessionStorage',
      integrationOrder:[],
      canUserSeeConversationList:false,
      locale: 'pt-BR',
      menuItems: {
        imageUpload: true,
        fileUpload: true,
        shareLocation: false
      },
      fixedHeader: true,
      customText: {
        actionPaymentCompleted: 'Pagamento Finalizado',          
        actionPaymentError: 'Ocorreu um erro ao processar o cartÃ£o. <br> Por favor, tente novamente ou use um cartÃ£o diferente.',            
        actionPostbackError: 'Ocorreu um erro ao processar sua aÃ§Ã£o. Por favor, tente novamente.',      
        clickToRetry: 'Mensagem nÃ£o entregue. Clique para tentar novamente.',    
        clickToRetryForm: 'FormulÃ¡rio nÃ£o enviado. Clique em qualquer lugar do formulÃ¡rio para tentar novamente.',      
        // connectNotificationText: 'Sincronize sua conversa e continue nos enviando mensagens atravÃ©s de seu aplicativo favorito.',      
        connectNotificationSingleText: 'Seja notificado quando vocÃª receber uma resposta.',      
        conversationListHeaderText: 'Minhas conversas',    
        conversationListPreviewAnonymousText: 'AlguÃ©m',
        conversationListPreviewUserText: 'VocÃª',
        conversationListRelativeTimeJustNow: 'Agora mesmo',
        conversationListRelativeTimeMinute: '1 minuto atrÃ¡s',        
        conversationListRelativeTimeHour: '1 hora atrÃ¡s',  
        conversationListRelativeTimeYesterday: 'Ontem',
        conversationListTimestampFormat: 'MM/DD/YY',    
        conversationTimestampHeaderFormat: 'MMMM D YYYY, h:mm A',
        couldNotConnect: 'Offline. VocÃª nÃ£o receberÃ¡ mensagens.',    
        couldNotConnectRetry: 'Reconectando...',      
        couldNotConnectRetrySuccess: 'VocÃª estÃ¡ online novamente!',      
        couldNotLoadConversations: 'NÃ£o foi possÃ­vel carregar as conversas.',  
        emailChangeAddress: 'Alterar meu e-mail',          
        emailDescription: 'Para ser notificado por e-mail quando vocÃª obtiver uma resposta, digite seu endereÃ§o de e-mail.',      
        emailFieldLabel: 'E-mail',
        emailFieldPlaceholder: 'Seu endereÃ§o de e-mail',    
        emailFormButton: 'Enviar',
        emailLinkingErrorMessage: 'Por favor, envie um endereÃ§o de e-mail vÃ¡lido.',  
        fetchHistory: 'Carregar mais',  
        fetchingHistory: 'Recuperando histÃ³rico...',  
        fileTypeError: 'Tipo de arquivo nÃ£o suportado.',        
        formErrorInvalidEmail: 'E-mail Ã© invÃ¡lido',  
        formErrorUnknown: 'Isso nÃ£o parece muito certo',
        formFieldSelectPlaceholderFallback: 'Escolha um...',
        frontendEmailChannelDescription: 'Para falar conosco por e-mail, basta enviar uma mensagem para o nosso endereÃ§o de e-mail e nÃ³s responderemos em breve:',
        headerText: 'Como podemos ajudar?',
        imageClickToReload: 'Clique para recarregar a imagem.',
        imagePreviewNotAvailable: 'VisualizaÃ§Ã£o nÃ£o disponÃ­vel.',
        inputPlaceholder: 'Digite uma mensagem...',
        inputPlaceholderBlocked: 'Preencha o formulÃ¡rio acima...',
        introAppText: 'Envie-nos uma mensagem abaixo ou de seu aplicativo favorito.',
        lineChannelDescription: 'Para falar conosco usando LINE, digitalize este cÃ³digo QR usando o aplicativo LINE e envie-nos uma mensagem.',
        linkChannelPageHeader: 'Sincronize sua conversa',
        linkError: 'Ocorreu um erro ao tentar gerar um link para este canal. Por favor, tente novamente.',
        locationNotSupported: 'Seu navegador nÃ£o oferece suporte a serviÃ§os de localizaÃ§Ã£o ou foi desativado. Em vez disso, digite seu local.',
        locationSecurityRestriction: 'Este site nÃ£o pode acessar sua localizaÃ§Ã£o. Em vez disso, digite seu local.',
        locationSendingFailed: 'NÃ£o foi possÃ­vel enviar localizaÃ§Ã£o',
        locationServicesDenied: 'Este site nÃ£o pode acessar sua localizaÃ§Ã£o. Permita o acesso em suas configuraÃ§Ãµes ou digite seu local.',            
        messageRelativeTimeJustNow: 'Agora mesmo',        
        messageTimestampFormat: 'h:mm A',          
        messageDelivered: 'Entregue',        
        messageSeen: 'Visto',          
        messageSending: 'Enviando...',          
        // messengerChannelDescription: 'Conecte sua conta do Facebook Messenger para ser notificado quando vocÃª receber uma resposta e continue a conversa no Facebook Messenger.',        
        newConversationButtonText: 'Nova ConversaÃ§Ã£o',        
        notificationSettingsChannelsDescription: 'Sincronize esta conversa conectando-se ao seu aplicativo de mensagens favorito para continuar a conversa do seu jeito.',        
        notificationSettingsChannelsTitle: 'Outros canais',          
        notificationSettingsConnected: 'Conectado',
        prechatCaptureGreetingText: 'OlÃ¡. Para comeÃ§ar, gostarÃ­amos de saber um pouco mais sobre vocÃª:',          
        prechatCaptureNameLabel: 'Seu nome',        
        prechatCaptureNamePlaceholder: 'Digite seu nome...',  
        prechatCaptureEmailLabel: 'E-mail',      
        prechatCaptureEmailPlaceholder: 'name@company.com',        
        prechatCaptureConfirmationText: 'Obrigado por isso! Em que podemos ajudÃ¡-lo?',    
        sendButtonText: 'Enviar',    
        settingsHeaderText: 'ConfiguraÃ§Ãµes',      
        shareLocation: 'LocalizaÃ§Ã£o',        
        smsBadRequestError: 'NÃ£o nos foi possÃ­vel comunicar com este nÃºmero. Tente novamente ou use um diferente.',      
        smsCancel: 'Cancelar',      
        smsChangeNumber: 'Alterar meu nÃºmero',        
        smsChannelDescription: 'Conecte seu nÃºmero de SMS para ser notificado quando vocÃª receber uma resposta e continue a conversa por SMS.',  
        smsContinue: 'Enviar',      
        smsInvalidNumberError: 'Por favor, envie um nÃºmero de telefone vÃ¡lido.',  
        smsLinkPending: 'Pendente',  
        smsPingChannelError: 'Ocorreu um erro ao enviar uma mensagem para o seu nÃºmero.',        
        smsSendText: 'Envie-me um texto',      
        smsStartTexting: 'Iniciar mensagens de texto',        
        smsTooManyRequestsOneMinuteError: 'Uma conexÃ£o para esse nÃºmero foi solicitada recentemente. Tente novamente em 1 minuto.',      
        smsUnhandledError: 'Algo deu errado. Por favor, tente novamente.',        
        syncConversation: 'Sincronizar conversa',    
        tapToRetry: 'Mensagem nÃ£o entregue. Toque para tentar novamente.',      
        tapToRetryForm: 'FormulÃ¡rio nÃ£o enviado. Toque em qualquer lugar do formulÃ¡rio para tentar novamente.',
        telegramChannelDescription: 'Conecte sua conta do Telegram para ser notificado quando vocÃª receber uma resposta e continue a conversa no Telegram',  
        uploadDocument: 'Arquivo',  
        uploadInvalidError: 'Arquivo invÃ¡lido',
        uploadPhoto: 'Imagem',  
        uploadVirusError: 'Um vÃ­rus foi detectado em seu arquivo e ele foi rejeitado',  
        unsupportedMessageType: 'Tipo de mensagem nÃ£o suportado.',  
        unsupportedActionType: 'Tipo de aÃ§Ã£o nÃ£o suportado.',    
        viberChannelDescription: 'Conecte sua conta do Viber para ser notificado quando vocÃª receber uma resposta e continue a conversa no Viber. Para comeÃ§ar, leia o cÃ³digo QR usando o aplicativo Viber.',
        viberChannelDescriptionMobile: 'Conecte sua conta do Viber para ser notificado quando vocÃª receber uma resposta e continue a conversa no Viber. Para comeÃ§ar, instale o aplicativo Viber e toque em Conecta.',    
        viberQRCodeError: 'Ocorreu um erro ao obter o cÃ³digo QR do Viber. Por favor, tente novamente.',
        wechatChannelDescription: 'Conecte sua conta WeChat para ser notificado quando vocÃª receber uma resposta e continue a conversa no WeChat. Para comeÃ§ar, leia este cÃ³digo QR usando o aplicativo WeChat.',
        wechatChannelDescriptionMobile: 'Conecte sua conta WeChat para ser notificado quando vocÃª receber uma resposta e continue a conversa no WeChat. Para comeÃ§ar, salve esta imagem de cÃ³digo QR e envie-a para o <a href=\'weixin://dl/scan\'> leitor de cÃ³digo QR </a>.',
        wechatQRCodeError: 'Ocorreu um erro ao obter o cÃ³digo QR do WeChat. Por favor, tente novamente.',    
        messengerChannelDescription:'Conecte sua conta do Facebook Messenger para ser notificado quando vocÃª receber uma resposta e continue a conversa no Facebook Messenger.',
        whatsappChannelDescriptionDesktop:'Sincronize sua conta com o WhatsApp lendo o cÃ³digo QR ou clicando no link abaixo.\nEm seguida, envie a mensagem prÃ©-preenchida para validar a solicitaÃ§Ã£o de sincronizaÃ§Ã£o.',
        whatsappChannelDescriptionMobile: 'Sincronize sua conta com o WhatsApp clicando no link abaixo.\nEm seguida, envie a mensagem prÃ©-preenchida para validar a solicitaÃ§Ã£o de sincronizaÃ§Ã£o. (Seu codigo Ã©: {{code}}).',
        whatsappLinkingError: 'Ocorreu um erro ao buscar suas informaÃ§Ãµes de vinculaÃ§Ã£o do WhatsApp. Por favor, tente novamente.',
        connectNotificationText: 'Sincronize sua conversa e continue nos enviando mensagens atravÃ©s de seu aplicativo favorito.'
      }
    });
    
    initPromise.then(function(){

    });
  }, []);

  return (
    <div>

    </div>
  );
};

export default Chatbot;