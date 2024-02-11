<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('password','password-confirm'); section>
    <#if section = "header">
      <div>
            <img  style="width:170px; display: block;margin-left: auto;margin-bottom:60px; margin-right: auto;margin-top: 30px;"src="${url.resourcesPath}/img/logonew.png
            " alt="Alfresco">
        </div>
     <div  style ="font-weight: 900;">    ${msg("updatePasswordTitle")}</div>
    <#elseif section = "form">
        <form id="kc-passwd-update-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
            <input type="text" id="username" name="username" value="${username}" autocomplete="username"
                   readonly="readonly" style="display:none;"/>
            <input type="password" id="password" name="password" autocomplete="current-password" style="display:none;"/>



 



           <div class="${properties.kcFormGroupClass!}">

                    <div class="mdc-text-field mdc-text-field--with-leading-icon ${properties.kcLabelClass!}">
                        <i class="material-icons mdc-text-field__icon" role="button">lock</i>
                        <input   aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>" tabindex="0" required   class="mdc-text-field__input ${properties.kcInputClass!}"  id="password-new" name="password-new" type="password" autocomplete="new-password">
                        <div class="mdc-line-ripple"></div>
                        <label  for="password-new" class="mdc-floating-label ${properties.kcLabelClass!}">${msg("passwordNew")}</label>
                         <#if messagesPerField.existsError('password')>
                        <span id="input-error-password" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('password'))?no_esc}
                        </span>
                    </#if>
                    </div>

                </div>

  
           <div class="${properties.kcFormGroupClass!}">

                    <div class="mdc-text-field mdc-text-field--with-leading-icon ${properties.kcLabelClass!}">
                        <i class="material-icons mdc-text-field__icon" role="button">lock</i>
                        <input     aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"  tabindex="0" required   class="mdc-text-field__input ${properties.kcInputClass!}"  id="password-confirm" name="password-confirm"  type="password" autocomplete="new-password">
                        <div class="mdc-line-ripple"></div>
                        <label  for="password-confirm" class="mdc-floating-label ${properties.kcLabelClass!}">${msg("passwordConfirm")}</</label>
                      
                    <#if messagesPerField.existsError('password-confirm')>
                        <span id="input-error-password-confirm" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
                        </span>
                    </#if>
                    </div>

                </div>



            <div class="${properties.kcFormGroupClass!}">
                <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                    <div class="${properties.kcFormOptionsWrapperClass!}">
                        <#if isAppInitiatedAction??>
                            <div class="checkbox">
                                <label><input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" checked> ${msg("logoutOtherSessions")}</label>
                            </div>
                        </#if>
                    </div>
                </div>


 











                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}"  style="margin-top : 18px " style="margin-top : 18px " style="margin-bottom : 7px ">
                    <#if isAppInitiatedAction??>
                        <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}" />
                        <button class="${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonLargeClass!}" type="submit" name="cancel-aia" value="true" />${msg("doCancel")}</button>
                    <#else>
                        <input style=" border-width: 0px; background-color:#8cc861;border-radius:20px;--mdc-ripple-fg-size:53px;--mdc-ripple-fg-scale:2.00702;--mdc-ripple-fg-translate-start:-11.1041px, -12.3959px;--mdc-ripple-fg-translate-end:18.1979px, -8.5px;margin-right: 20px;margin-left: 20px;padding-left: 16px;width: 412px;padding-right: 16px;height: 40px;"  class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}" />
                    </#if>
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>