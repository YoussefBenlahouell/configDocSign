<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "header" >
      <div >
            <img  style="width:170px; display: block;margin-left: auto;margin-bottom:60px; margin-right: auto;margin-top: 30px;"src="${url.resourcesPath}/img/logonew.png" alt="Alfresco">
        </div>
        <div  style ="font-weight: 900;">
        ${msg("emailForgotTitle")} </div> 
        <div style="color :#1a87b8 ;font-size: 14px; line-height:100%;font-family:cursive; padding-top:15px;">   ${msg("emailInstruction")}</div>
        
    <#elseif section = "form">
     
        <form id="kc-reset-password-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
          <div class="${properties.kcFormGroupClass!}">
         

                <div class="mdc-text-field mdc-text-field--with-leading-icon ${properties.kcLabelClass!}">         
                      <i class="material-icons mdc-text-field__icon" role="button">email</i>
                    <input  tabindex="0"  required  type="text" id="username" name="username" class=" mdc-text-field__input ${properties.kcInputClass!}" autofocus value="${(auth.attemptedUsername!'')}" aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"/>
                         <div class="mdc-line-ripple"></div>
                    <label for="username" class="mdc-floating-label ${properties.kcLabelClass!}">
                        ${msg("email")}
                    </label>
                    
                    <#if messagesPerField.existsError('username')>
                        <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('username'))?no_esc}
                        </span>
                    </#if>
                 
                </div>
            </div>

                 <!-- <div class="${properties.kcFormGroupClass!} ">

                <div class="mdc-text-field mdc-text-field--with-leading-icon ${properties.kcLabelClass!}">
                    <i class="material-icons mdc-text-field__icon" role="button">email</i>
                    <input  tabindex="0" required id="email" class="mdc-text-field__input ${properties.kcInputClass!}" name="email" value="${(auth.attemptedUsername!'')}" type="text" autofocus autocomplete="off">
                    <div class="mdc-line-ripple"></div>
                    <label for="email" class="mdc-floating-label ${properties.kcLabelClass!}">
                        ${msg("email")}
                    </label>
                    
                    
                    
                    
                    <#if messagesPerField.existsError('username')>
                        <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('username'))?no_esc}
                        </span>
                    </#if>
                </div>

            </div>-->
            
            <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                    <div class="${properties.kcFormOptionsWrapperClass!}">
                        <span style="position: relative; margin-bottom:60px; left: 380px;top: 10px; width: 21px; height: 24px;opacity: 0.54;border: none;color: darkslateblue;text-size-adjust: 10px;"><a href="${url.loginUrl}"><< ${kcSanitize(msg("backToLogin"))?no_esc} >></a></span>
                    </div>
                </div>

                <div style="margin-top : 18px" id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <input style="background-color:#8cc861;border-radius:20px;border-width:0px;--mdc-ripple-fg-size:53px;--mdc-ripple-fg-scale:2.00702;--mdc-ripple-fg-translate-start:-11.1041px, -12.3959px;--mdc-ripple-fg-translate-end:18.1979px, -8.5px;margin-right: 20px;margin-left: 20px;padding-left: 16px;width: 412px;padding-right: 16px;height: 40px;" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}"/>
                </div>


            </div>
        </form>
<!--
    <#elseif section = "info" >
   
        <#if realm.duplicateEmailsAllowed>
            ${msg("emailInstructionUsername")}
        <#else>
               ${msg("emailInstruction")}

        </#if>
  -->
    </#if>
</@layout.registrationLayout>
