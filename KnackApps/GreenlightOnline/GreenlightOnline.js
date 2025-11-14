window.APP_VERSION = '1.0.1'; // CDN test deployment

window.ktlReady = function (appInfo = {}) {
    var ktl = new Ktl($, appInfo);


    // KTL Configuration using const for immutable config
    ktl.core.setCfg({
        developerNames: ['Michael Tierney'],
        developerEmail: 'michael@greenlightservices.com.au',
        devOptionsPin: '9136',

        enabled: {
            versionInfo: {
                viShowAppInfo: true,
                viShowKtlInfo: true,
                viShowToRoles: ['Developer'],
                viPosX: 'right',
                viPosY: 'top',
                viPosXMobile: 'center',
                viPosYMobile: 'bottom',
                viOpacity: 50,
                viOpacityHover: 100,
            },

            showMenuInTitle: true,
            selTextOnFocus: true,
            inlineEditColor: true,
            rowHoverHighlight: true,
            autoFocus: true,
            sortedMenus: true,
            userFilters: false,
            persistentForm: true,
            calendarGotoDate: true,
            rememberMe: true,
            formPreValidation: true,
            spinnerWatchDog: true,
            idleWatchDog: true,
            debugWnd: true,
            devInfoPopup: true,
            devPauseAutoRefresh: true,
            virtualKeyboard: false,
            iFrameWnd: true,

            bulkOps: {
                bulkEdit: true,
                bulkCopy: true,
                bulkDelete: true,
                bulkAction: true
            }
        },

        popupStyle: {
            success: ';background-color:#81b378;border:5px solid #294125',
            warning: ';background-color:#fffa5e;border:2px solid #7e8060',
            error: ';background-color:#FFB0B0;border:5px solid #660000'
        },

        tooltipStyles: {
            ktlTtipFormViewBgColor: '#222222',
            ktlTtipFormViewTxtColor: '#ffffff',
            ktlTtipIconFormViewColor: '#222222',
            ktlTtipDetailsViewBgColor: '#222222',
            ktlTtipDetailsViewTxtColor: '#ffffff',
            ktlTtipIconDetailsViewColor: '#222222',
            ktlTtipTableViewBgColor: '#222222',
            ktlTtipTableViewTxtColor: '#ffffff',
            ktlTtipIconTableViewColor: '#222222'
        }
    });

    ktl.scenes.setCfg({
        versionDisplayName: '',
        idleWatchDogDelay: 7200000,
        spinnerCtrDelay: 60,
        spinnerWdExcludeScn: [''],
    });

    ktl.views.setCfg({
        quickToggleParams: {
            bgColorTrue: '#39d91f',
            bgColorFalse: '#f04a3b',
            bgColorPending: '#dd08',
            showSpinner: true,
            showNotification: true,
            pendingClass: '',
        },

        headerAlignment: true,
        ktlFlashRate: '1',
        ktlOutlineColor: '#39b54a',
        ktlHideShowButtonColor: '#222222',
        stickGroupingsWithHeader: true,
        hscCollapsedColumnsWidth: '5',
        hscGlobal: false,
    });

    ktl.fields.setCfg({
        textAsNumeric: [''],
        textAsNumericExcludeScenes: [''],
        horizontalRadioButtons: false,
        horizontalCheckboxes: false,
        barcodeTimeout: 20,
        barcodeMinLength: 3,
        convertNumToTel: true,
    });

    ktl.persistentForm.setCfg({
        scenesToExclude: [''],
        fieldsToExclude: [''],
    });

    ktl.systemColors.setCfg({
        inlineEditBkgColor: '',
        inlineEditFontWeight: '',
        tableRowHoverBkgColor: '',
    });

    // Features that do not apply to the iFrameWnd
    if (!window.self.frameElement) {
        ktl.scenes.setCfg({
            ktlKioskButtons: {
                ADD_REFRESH: {
                    html: '<i class="fa fa-refresh"></i>',
                    id: 'kn-button-refresh',
                    href: () => location.reload(),
                    scenesToExclude: [''],
                },
                ADD_BACK: {
                    html: '<i class="fa fa-arrow-left"></i>',
                    id: 'kn-button-back',
                    href: () => window.history.back(),
                    scenesToExclude: [''],
                },
                ADD_DONE: {
                    html: '<i class="fa fa-check-square-o"></i>',
                    id: 'kn-button-done',
                    href: () => { /* Your done function here */ },
                    scenesToExclude: [''],
                },
            },
        });
    }

    ktl.log.setCfg({
        logEnabled: {
            critical: true,
            error: true,
            serverErr: true,
            warning: true,
            info: true,
            debug: false,
            login: true,
            activity: false,
            navigation: true,
        }
    });

    // Override KTL's hide/show button styling
    ktl.core.injectCSS(`
        /* Override KTL's CSS custom property */
        :root {
            --ktlHideShowButtonColor: #39b54a !important;
        }

        /* Override button styling */
        .ktlHideShowButton {
            color: #FFFFFF !important;
            background-color: transparent !important;
            padding: 12px 20px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            font-family: 'Open Sans', sans-serif !important;
            border-radius: 8px 8px 0 0 !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            text-align: center !important;
        }

        /* Target headers with hide/show buttons using JavaScript class instead of :has() */
        .kn-content .view-header.has-hide-show-button {
            background-color: #39b54a !important;
            border: 2px solid #39b54a !important;
            box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
            transition: all 0.3s ease !important;
        }

        /* Hover effects */
        .kn-content .view-header.has-hide-show-button:hover {
            background-color: #039b17 !important;
            border-color: #039b17 !important;
        }

        /* Title styling */
        .kn-content .view-header.has-hide-show-button .kn-title {
            color: #FFFFFF !important;
            font-weight: 600 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        /* Arrow styling */
        .ktlArrow {
            color: #FFFFFF !important;
            font-size: 18px !important;
        }

        /* Content area styling */
        .ktlBoxWithBorder {
            background-color: #F9F9F9 !important;
            border: 2px solid #39b54a !important;
            border-top: none !important;
            border-radius: 0 0 8px 8px !important;
            padding: 20px !important;
            box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
        }
    `);

    // Add class to headers with hide/show buttons (replacing :has() selector)
    $(document).ready(() => {
        $('.ktlHideShowButton').closest('.view-header').addClass('has-hide-show-button');
    });

    // === KTL Setup - END ===

    // === App-specific code begins here ===

    // Add Favicon to Subdomain with Hash-based Icons
    // Define updateFavicon once
    const updateFavicon = () => {
        let link = document.querySelector("link[rel*='icon']") ?? document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';

        const hash = window.location.hash;
        const fullUrl = window.location.href;

        // Check for specific hashes and set appropriate favicon and title
        if (hash === '#enquiries5' || fullUrl.includes('#enquiries5')) {
            // Green 'E' favicon
            link.href = 'https://s3.ap-southeast-2.amazonaws.com/ap-southeast-2-assets.knack.com/assets/5c14a85b4726bd086c90877c/683e526f66188e0290085e01/original/greenefavicon.png';
            document.title = 'Enquiries';
        } else if (hash === '#reports3' || fullUrl.includes('#reports3')) {
            // Green 'R' favicon
            link.href = 'https://s3.ap-southeast-2.amazonaws.com/ap-southeast-2-assets.knack.com/assets/5c14a85b4726bd086c90877c/683e532d66188e0290085e2f/original/greenrfavicon.png';
            document.title = 'Reports';
        } else {
            // Default favicon
            link.href = 'https://greenlightservices.com.au/wp-content/uploads/fbrfg/favicon-48x48.png';
        }

        // Remove existing favicon links to avoid conflicts
        const existingLinks = document.querySelectorAll("link[rel*='icon']");
        existingLinks.forEach((existingLink) => {
            if (existingLink !== link) {
                existingLink.remove();
            }
        });

        document.getElementsByTagName('head')[0].appendChild(link);
    };

    // Update favicon on scene render
    $(document).on('knack-scene-render.any', (event, scene) => {
        updateFavicon();
    });

    // Listen for hash changes only once
    window.addEventListener('hashchange', updateFavicon);

    // Handle centralized authentication for direct access Knack app
    $(document).on('knack-scene-render.any', (event, scene) => {
        // Check if user is logged in
        const isLoggedIn = Knack.getUserAttributes() !== "No user found";

        // Get the current hash (without the #)
        const currentHash = window.location.hash.substring(1);

        // Don't do redirects on the welcome page or when already logged in
        if (currentHash.startsWith('welcome-page') || isLoggedIn) {
            // If we're on the welcome page after login and there's a return_to parameter,
            // redirect to the saved destination
            if (isLoggedIn && currentHash.startsWith('welcome-page')) {
                // Extract query string from hash if present, otherwise use window.location.search
                let queryString = '';
                // Prefer query string in hash, else fallback to search
                if (window.location.hash.includes('?')) {
                    queryString = window.location.hash.split('?')[1] || '';
                } else if (window.location.search.startsWith('?')) {
                    queryString = window.location.search.substring(1);
                }
                const urlParams = new URLSearchParams(queryString);
                const returnTo = urlParams.get('return_to');

                if (returnTo) {
                    // Remove return_to from the URL (both hash and search)
                    let newHash = window.location.hash.split('?')[0];
                    window.history.replaceState({}, document.title, window.location.pathname + newHash);
                    // Redirect to the saved destination
                    window.location.hash = returnTo;
                }
            }
            return;
        }

        // If we get here, user needs to log in and we're not on the welcome page
        // Save the current page hash to return to after login
        const returnToUrl = encodeURIComponent(currentHash);

        // Direct browser access to Knack - redirect to welcome page with return_to parameter
        window.location.href = `#welcome-page?return_to=${returnToUrl}`;
    });

    // Handle return_to parameter on the welcome page
    $(document).on('knack-scene-render.scene_258', (event, scene) => {
        // Store the return_to parameter from the URL if it exists
        const urlParams = new URLSearchParams(window.location.search);
        const returnTo = urlParams.get('return_to');

        if (returnTo) {
            // Store in localStorage to retrieve after authentication
            localStorage.setItem('knack_return_to', returnTo);
        }
    });

    // After successful login, check for stored return URL
    $(document).on('knack-user-logged-in.any', (event) => {
        const returnTo = localStorage.getItem('knack_return_to');

        if (returnTo) {
            // Clear the stored value
            localStorage.removeItem('knack_return_to');

            // Redirect to the stored destination
            window.location.hash = returnTo;
        }
    });

    // Initialize filter button click animations
    const initializeFilterClicks = () => {
        // Array of view IDs that have filter buttons
        const filterViews = ['view_3503', 'view_4791', 'view_4793', 'view_4795', 'view_4798',
            'view_4800', 'view_4803', 'view_4804', 'view_4829', 'view_4860', 'view_4870', 'view_5427', 'view_5433'];

        // Create selector string for all views
        const viewSelectors = filterViews.map(viewId =>
            `#${viewId} div.kn-records-nav div.js-filter-menu.tabs.is-toggle.is-flush a`
        ).join(', ');

        $(document).off('mousedown.filterInteractive');
        $(document).on('mousedown.filterInteractive', viewSelectors, (e) => {
            const $button = $(e.currentTarget);

            // Add clicking class for animation
            $button.addClass('clicking');

            // Remove clicking class after short delay
            setTimeout(() => {
                $button.removeClass('clicking');
            }, 150);
        });
    };

    // Initialize on document ready
    $(document).ready(() => {
        initializeFilterClicks();
    });

    // ============================================
    // COMPLETE GREENLIGHTONLINE APPLICATION CODE
    // Place this after your KTL setup code
    // ============================================

    // ============================================
    // LOGIN PAGE MANAGEMENT
    // ============================================

    // Login page state management
    $(document).on('knack-page-render.any', () => {
        // Check if we're on a login-related page
        const isLoginPage = $('.kn-login').length > 0;
        const isRegisterPage = $('.kn-register').length > 0;
        const isResetPage = $('#knack-reset-pass').length > 0;
        const isLoginRelatedPage = isLoginPage || isRegisterPage || isResetPage;

        // Add or remove loginPage class based on current page
        if (isLoginRelatedPage) {
            $('#knack-body, .kn-scenes').addClass('loginPage');
        } else {
            $('#knack-body, .kn-scenes').removeClass('loginPage');
        }

        // Only run login page enhancements on actual login page
        if (isLoginPage) {
            setTimeout(() => {
                enhanceLoginPage();
            }, 100);
        }
    });

    // Main login page enhancement function
    const enhanceLoginPage = () => {
        const $loginContainer = $('.kn-login');
        const $formColumn = $loginContainer.find('.column.is-half');

        // Check if already rebuilt
        if ($loginContainer.hasClass('login-rebuilt')) {
            return;
        }

        console.log('Starting login form rebuild...');

        // Extract existing elements
        const $existingForm = $loginContainer.find('.kn-login-form form');
        const $ssoContainer = $('.kn-sso-container');
        const $title = $loginContainer.find('.kn-title').clone();
        const $description = $loginContainer.find('.kn-description').clone();

        // Extract form fields
        const emailInput = $existingForm.find('input[type="email"]').clone();
        const passwordInput = $existingForm.find('#password').clone();
        const rememberCheckbox = $existingForm.find('input[name="remember"]').clone();
        const submitButton = $existingForm.find('input[type="submit"]').clone();
        const googleButton = $ssoContainer.find('a.kn-button.is-google').clone();

        // Extract links
        const forgotPasswordLink = $('#forgot-pass').clone();
        const needAccountSection = $('#need-account').clone();

        // Get form attributes
        const $form = $('<form></form>');
        if ($existingForm[0] && $existingForm[0].attributes) {
            const originalFormAttrs = $existingForm[0].attributes;
            for (let i = 0; i < originalFormAttrs.length; i++) {
                const attr = originalFormAttrs[i];
                $form.attr(attr.name, attr.value);
            }
        }

        // Create new form structure
        const $formDiv = $('<div class="kn-login-form rebuilt"></div>');

        // Add Google button if exists
        if (googleButton.length) {
            const $googleWrapper = $('<div class="login-google-wrapper"></div>');
            $googleWrapper.append(googleButton);
            $form.append($googleWrapper);

            // Add OR divider
            const $divider = $('<div class="line"><div class="bg-emphasis"></div><span class="text-subtle">or</span><div class="bg-emphasis"></div></div>');
            $form.append($divider);
        }

        // Email field
        const $emailField = $('<div class="control login-field"></div>');
        $emailField.append('<label for="email">Email</label>');
        emailInput.attr('placeholder', 'Email');
        $emailField.append(emailInput);
        $form.append($emailField);

        // Password field
        const $passwordField = $('<div class="control login-field"></div>');
        $passwordField.append('<label for="password">Password</label>');
        passwordInput.attr('placeholder', 'Password');
        $passwordField.append(passwordInput);
        $form.append($passwordField);

        // Options container (Remember me + Forgot password)
        const $optionsContainer = $('<div class="login-options-container"></div>');

        // Remember me
        if (rememberCheckbox.length) {
            const $rememberControl = $('<div class="control"></div>');
            const $rememberLabel = $('<label class="remember"></label>');
            $rememberLabel.append(rememberCheckbox);
            $rememberLabel.append(' Remember me');
            $rememberControl.append($rememberLabel);
            $optionsContainer.append($rememberControl);
        }

        // Forgot password
        if (forgotPasswordLink.length) {
            forgotPasswordLink.removeClass().addClass('forgot-password-link');
            forgotPasswordLink.attr('id', 'forgot-pass');
            forgotPasswordLink.text('Forgot your password?');
            $optionsContainer.append(forgotPasswordLink);
        }

        $form.append($optionsContainer);

        // Submit button
        const $submitWrapper = $('<div class="kn-submit"></div>');
        submitButton.val('Sign In');
        $submitWrapper.append(submitButton);
        $form.append($submitWrapper);

        // Need account section
        if (needAccountSection.length) {
            const $signUpBtn = needAccountSection.find('.register.kn-button').clone();
            const $needAccountNew = $('<div id="need-account"></div>');
            $needAccountNew.text('Need an account?');

            if ($signUpBtn.length) {
                $signUpBtn.removeClass('kn-button is-primary');
                $signUpBtn.addClass('register-link');
                $signUpBtn.text('Sign Up');
                $signUpBtn.css({
                    'color': '#363636',
                    'text-decoration': 'underline',
                    'font-weight': '700',
                    'background': 'none',
                    'border': 'none',
                    'padding': '0',
                    'cursor': 'pointer',
                    'margin-left': '5px'
                });
                $needAccountNew.append($signUpBtn);
            }
            $form.append($needAccountNew);
        }

        // Build the complete form
        $formDiv.append($form);

        // Clear and rebuild the column
        $formColumn.find('.kn-login-form').remove();
        $formColumn.append($formDiv);

        // Remove original SSO container if it was outside
        if ($ssoContainer.hasClass('column')) {
            $ssoContainer.remove();
        }

        // Clean up any empty columns
        $('.kn-login .column:empty').remove();

        // Mark as rebuilt
        $loginContainer.addClass('login-rebuilt');

        console.log('Login form rebuild complete');
    };

    // ============================================
    // RESET PASSWORD FUNCTIONALITY
    // ============================================

    $(document).on('knack-scene-render.scene_257', () => {

        // Immediate column layout fixes
        setTimeout(() => {
            const $resetForm = $('#knack-reset-pass');
            if ($resetForm.length) {
                $resetForm.find('.columns').removeClass('columns');
                $resetForm.find('.column').removeClass('column is-constrained');
                $resetForm.find('ul, li, .kn-input').css({
                    'width': '100%',
                    'max-width': '100%',
                    'display': 'block',
                    'margin': '0',
                    'padding': '0'
                });
                $resetForm.find('li').removeAttr('style');
                console.log('Reset password form fixed');
            }
        }, 100);

        // Set up dynamic content watcher
        const watchForResetPassword = () => {
            let attempts = 0;
            const maxAttempts = 50;

            const checkInterval = setInterval(() => {
                attempts++;
                const $resetForm = $('#knack-reset-pass');

                const hasForm = $resetForm.length &&
                    $resetForm.find('form').length &&
                    $resetForm.find('input[type="email"]').length;

                if (hasForm && !$resetForm.hasClass('reset-reconstructed')) {
                    console.log('🔍 Reset password form detected - starting reconstruction...');
                    clearInterval(checkInterval);
                    reconstructResetPasswordForm($resetForm);
                } else if (attempts >= maxAttempts) {
                    clearInterval(checkInterval);
                    console.log('⏱️ Reset password watch timeout');
                }
            }, 100);
        };

        watchForResetPassword();

        // Watch for click events on forgot password links
        $(document).on('click', 'a[href*="forgot"], #forgot-pass, .forgot-password', function () {
            console.log('🔗 Forgot password link clicked - starting enhanced watch...');
            setTimeout(() => {
                watchForResetPassword();
            }, 200);
        });
    });

    // CORRECTED Reset password reconstruction function
    const reconstructResetPasswordForm = ($resetForm) => {
        console.log('Starting reset password reconstruction...');
        $resetForm.addClass('reset-reconstructed');

        const $existingForm = $resetForm.find('form');

        // Verify we have a valid form
        if ($existingForm.length === 0 || $existingForm.find('input[type="email"]').length === 0) {
            console.log('⚠️ Invalid form state - skipping reconstruction');
            $resetForm.removeClass('reset-reconstructed');
            return;
        }

        console.log('✅ Valid form detected - proceeding with reconstruction');

        // Clone elements
        const emailInput = $existingForm.find('input[type="email"]').clone();
        const submitButton = $existingForm.find('button[type="submit"], input[type="submit"]').clone();
        const formAction = $existingForm.attr('action') || '#';

        // Create new structure
        const $newContainer = $('<div class="reset-rebuilt-container"></div>');
        const $logo = $('<div class="reset-logo-rebuilt"></div>');
        const $header = $('<div class="reset-header-rebuilt">' +
            '<h2 class="reset-title">Reset Password</h2>' +
            '<p class="reset-subtitle">Enter your email address and we\'ll send you a link to reset your password.</p>' +
            '</div>');

        const $form = $('<form action="' + formAction + '" method="post" novalidate="" class="reset-form-rebuilt gl-reset-form"></form>');

        // Safe attribute copying
        if ($existingForm[0] && $existingForm[0].attributes) {
            try {
                const originalFormAttrs = $existingForm[0].attributes;
                for (let i = 0; i < originalFormAttrs.length; i++) {
                    const attr = originalFormAttrs[i];
                    if (attr.name !== 'action') {
                        $form.attr(attr.name, attr.value);
                    }
                }
            } catch (error) {
                console.log('⚠️ Error copying form attributes:', error.message);
            }
        }

        // Email field with validation setup
        const $emailField = $('<div class="control reset-field gl-email-field"></div>');
        $emailField.append('<label for="reset-email" class="gl-email-label">Email</label>');

        // FIX: Correct placeholder and add validation attributes
        emailInput.addClass('gl-email-input')
            .attr({
                'id': 'reset-email',
                'placeholder': 'Email',  // ← Fixed placeholder
                'required': true,
                'type': 'email'
            });
        $emailField.append(emailInput);

        // Add error message container
        const $errorMessage = $('<div class="gl-error-message"></div>');
        $emailField.append($errorMessage);

        // Submit button
        const $submitWrapper = $('<div class="reset-submit-wrapper gl-submit-wrapper"></div>');
        if (submitButton.is('button')) {
            submitButton.text('Continue');
        } else {
            submitButton.val('Continue');
        }
        submitButton.addClass('reset-submit-btn gl-submit-btn');
        $submitWrapper.append(submitButton);

        // Back link
        const $backLink = $('<div class="reset-back-link gl-back-link">' +
            '<a href="#welcome-page" class="gl-back-link-text">Back to Login</a>' +
            '</div>');

        // Build form
        $form.append($emailField);
        $form.append($submitWrapper);
        $form.append($backLink);

        // Build container
        $newContainer.append($logo);
        $newContainer.append($header);
        $newContainer.append($form);

        // Handle confirmation message
        const $confirmation = $resetForm.find('.kn-form-confirmation').clone();
        if ($confirmation.length && $confirmation.text().trim()) {
            $newContainer.prepend($confirmation);
        }

        // Replace everything
        $resetForm.empty();
        $resetForm.append($newContainer);
        $('.kn-view.kn-back-link').remove();

        // Add scene class
        $('.kn-scene').each(function () {
            if ($(this).find('#knack-reset-pass').length) {
                $(this).addClass('has-reset-form');
            }
        });

        // FIX: Set up email validation
        setupResetPasswordValidation($form, emailInput, $errorMessage, submitButton);

        console.log('✅ Reset password reconstruction complete with validation');

        // Set up confirmation watcher
        watchForConfirmationPage();
    };

    // IMPROVED Email validation function with better UX
    const setupResetPasswordValidation = ($form, $emailInput, $errorMessage, $submitButton) => {
        // Better email regex - requires proper TLD
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let hasAttemptedSubmit = false; // Track if user has tried to submit

        const validateEmail = (showErrors = true) => {
            const email = $emailInput.val().trim();
            let isValid = true;
            let errorMessage = '';

            // Check if email is empty
            if (!email) {
                isValid = false;
                errorMessage = 'Email address is required';
            }
            // Check email format - now requires TLD like .com
            else if (!emailRegex.test(email)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }

            // Only show errors if user has attempted submit OR if explicitly requested
            if (showErrors && hasAttemptedSubmit) {
                if (isValid) {
                    $errorMessage.removeClass('show').text('');
                    $emailInput.removeClass('error').addClass('valid');
                } else {
                    $errorMessage.addClass('show').text(errorMessage);
                    $emailInput.removeClass('valid').addClass('error');
                }
            } else if (showErrors && !hasAttemptedSubmit) {
                // Before first submit - only show success state, never errors
                if (isValid && email.length > 0) {
                    $errorMessage.removeClass('show').text('');
                    $emailInput.removeClass('error').addClass('valid');
                } else {
                    // Don't show error state before first submit
                    $errorMessage.removeClass('show').text('');
                    $emailInput.removeClass('error valid');
                }
            }

            return isValid;
        };

        // Real-time validation (but only show errors AFTER first submit attempt)
        $emailInput.on('input', function () {
            validateEmail(true);
        });

        // On blur, only validate if user has attempted submit
        $emailInput.on('blur', function () {
            if (hasAttemptedSubmit) {
                validateEmail(true);
            }
        });

        // Form submission validation
        $form.on('submit', function (e) {
            console.log('📤 Reset form submit attempted...');

            // Mark that user has attempted to submit
            hasAttemptedSubmit = true;

            // Force show errors now
            const isValid = validateEmail(true);

            if (!isValid) {
                console.log('❌ Form validation failed');
                e.preventDefault();
                e.stopPropagation();
                $emailInput.focus();
                return false;
            }

            console.log('✅ Form validation passed - submitting...');
            return true;
        });

        console.log('🔒 Email validation setup complete');
    };

    // Watch for confirmation page
    const watchForConfirmationPage = () => {
        $(document).on('submit', '.reset-form-rebuilt', function () {
            console.log('📤 Reset form submitted - watching for confirmation...');

            setTimeout(() => {
                let attempts = 0;
                const confirmationWatch = setInterval(() => {
                    attempts++;
                    const $resetForm = $('#knack-reset-pass');
                    const $confirmParagraph = $resetForm.find('p:contains("An email will be sent")');

                    if ($confirmParagraph.length && !$resetForm.hasClass('confirmation-enhanced')) {
                        console.log('📧 Confirmation page detected');
                        clearInterval(confirmationWatch);
                        reconstructConfirmationPage();
                    } else if (attempts >= 30) {
                        clearInterval(confirmationWatch);
                        console.log('⏱️ Confirmation watch timeout');
                    }
                }, 100);
            }, 500);
        });
    };

    // Confirmation page reconstruction
    const reconstructConfirmationPage = () => {
        const $resetForm = $('#knack-reset-pass');
        const $confirmParagraph = $resetForm.find('p:contains("An email will be sent")');

        if ($confirmParagraph.length && !$resetForm.hasClass('confirmation-enhanced')) {
            console.log('Starting confirmation page reconstruction...');
            $resetForm.addClass('confirmation-enhanced confirmation-state');

            const confirmationText = $confirmParagraph.clone();
            const $newContainer = $('<div class="reset-confirmation-container"></div>');
            const $logo = $('<div class="confirmation-logo"></div>');
            const $title = $('<h2 class="reset-confirmation-title">Check Your Email</h2>');
            const $returnLink = $('<div class="reset-confirmation-return">' +
                '<a href="#welcome-page" class="ang-link">Return to Login</a>' +
                '</div>');

            confirmationText.removeClass().addClass('confirmation-message');
            $newContainer.append($logo);
            $newContainer.append($title);
            $newContainer.append(confirmationText);
            $newContainer.append($returnLink);

            $resetForm.empty();
            $resetForm.append($newContainer);

            console.log('✅ Confirmation page reconstruction complete');
        }
    };

    // ============================================
    // SIGN UP / REGISTRATION FUNCTIONALITY
    // ============================================

    // Watch for sign up link clicks
    $(document).on('click', 'a[href*="register"], .register.kn-button, #need-account .register', () => {
        console.log('Sign up link clicked - waiting for form...');

        let checkCount = 0;
        const checkInterval = setInterval(() => {
            checkCount++;

            if ($('#register_all_users').length && !$('#register_all_users').hasClass('signup-reconstructed')) {
                console.log('Sign up form found - reconstructing...');
                reconstructSignUpForm();
                clearInterval(checkInterval);
            }

            if (checkCount > 30) {
                clearInterval(checkInterval);
            }
        }, 100);
    });

    // Main sign up reconstruction function
    const reconstructSignUpForm = () => {
        const $registerForm = $('#register_all_users');

        if (!$registerForm.length || $registerForm.hasClass('signup-reconstructed')) {
            return;
        }

        console.log('Starting signup reconstruction...');
        $registerForm.addClass('signup-reconstructed');

        // Extract elements
        const nameFirst = $registerForm.find('input#first').clone();
        const nameLast = $registerForm.find('input#last').clone();
        const nameLabel = $registerForm.find('.kn-input-name label').first().clone();
        const emailInput = $registerForm.find('input[type="email"]').clone();
        const emailLabel = $registerForm.find('.kn-input-email label').first().clone();
        const passwordInput = $registerForm.find('input[name="password"]').clone();
        const passwordConfirm = $registerForm.find('input[name="password_confirmation"]').clone();
        const passwordLabel = $registerForm.find('.kn-input-password label').first().clone();
        const submitButton = $registerForm.find('button[type="submit"]').clone();
        const googleHref = $('a[href*="auth/google"]').attr('href');

        // Create new structure
        const $newContainer = $('<div class="signup-rebuilt-container"></div>');
        const $logo = $('<div class="signup-logo-rebuilt"></div>');
        const $header = $('<div class="signup-header-rebuilt">' +
            '<h2 class="signup-title">Building Compliance - Made Easy</h2>' +
            '<p class="signup-subtitle">Free 14 Day Trial</p>' +
            '</div>');

        const $form = $('<form action="#" method="post" novalidate="" class="signup-form-rebuilt"></form>');

        // Google button
        const $googleBtn = $('<a class="kn-button is-sso is-google signup-google-btn" href="' + googleHref + '">' +
            'Sign Up with Google</a>');

        // Divider
        const $divider = $('<div class="signup-divider"><span>or</span></div>');

        // Name field
        const $nameField = $('<div class="signup-field"></div>');
        $nameField.append(nameLabel);
        const $nameInputs = $('<div class="name-inputs-group"></div>');
        $nameInputs.append(nameFirst.attr('placeholder', 'First'));
        $nameInputs.append(nameLast.attr('placeholder', 'Last'));
        $nameField.append($nameInputs);
        $nameField.append('<span class="error-message" style="display:none;"></span>');

        // Email field
        const $emailField = $('<div class="signup-field"></div>');
        $emailField.append(emailLabel);
        // FIX: Correct placeholder and add validation attributes
        emailInput.addClass('gl-email-input')
            .attr({
                'id': 'reset-email',
                'placeholder': 'Email',  // ← Fixed placeholder
                'required': true,
                'type': 'email'
            });
        $emailField.append(emailInput);
        $emailField.append('<span class="error-message" style="display:none;"></span>');

        // Password field
        const $passwordField = $('<div class="signup-field"></div>');
        $passwordField.append(passwordLabel);
        const $passwordWrapper = $('<div class="password-input-wrapper"></div>');
        $passwordWrapper.append(passwordInput.attr('placeholder', 'Must be at least 8 characters'));
        $passwordField.append($passwordWrapper);
        $passwordField.append('<span class="error-message" style="display:none;"></span>');

        // Confirm password
        const $confirmWrapper = $('<div class="confirm-password-wrapper" style="display:none;"></div>');
        $confirmWrapper.append(passwordConfirm.attr('placeholder', 'Confirm Password'));
        $passwordField.append($confirmWrapper);
        $passwordField.append('<span class="confirm-error-message error-message" style="display:none;"></span>');

        // Terms
        const $terms = $('<p class="signup-terms-text">By continuing you are agreeing to our ' +
            '<a href="https://greenlightservices.com.au/terms/" target="_blank">Terms & Conditions</a> ' +
            'and <a href="https://greenlightservices.com.au/privacy-policy/" target="_blank">Privacy Policy</a>.</p>');

        // Submit
        submitButton.text('Create Account');
        submitButton.addClass('signup-submit-btn');

        // Login link
        const $loginLink = $('<div class="signup-login-text">Already have an account? <a href="#welcome-page" class="login-link">Login</a></div>');

        // Build form
        $form.append($googleBtn);
        $form.append($divider);
        $form.append($nameField);
        $form.append($emailField);
        $form.append($passwordField);
        $form.append(submitButton);
        $form.append($terms);
        $form.append($loginLink);

        // Build container
        $newContainer.append($logo);
        $newContainer.append($header);
        $newContainer.append($form);

        // Replace everything
        $registerForm.empty();
        $registerForm.append($newContainer);

        // Clean up
        $('div[style*="float"]').remove();
        $('.kn-back-link').remove();

        // Set up interactions
        setupPasswordInteractions();
        setupFormValidation();

        console.log('✅ Signup reconstruction complete');
    };
    // ============================================
    // FORM VALIDATION
    // ============================================

    const setupFormValidation = () => {
        $(document).on('click', '.signup-submit-btn', function (e) {
            e.preventDefault();
            let hasErrors = false;
            let firstErrorField = null;

            // Clear all errors
            $('.signup-rebuilt-container .signup-field').removeClass('has-error');
            $('.signup-rebuilt-container .error-message').hide().text('');

            // Validate name
            const firstName = $('input#first').val().trim();
            const lastName = $('input#last').val().trim();
            if (!firstName || !lastName) {
                const $nameField = $('.name-inputs-group').closest('.signup-field');
                $nameField.addClass('has-error');
                $nameField.find('.error-message').text('Name is required').show();
                hasErrors = true;
                if (!firstErrorField) firstErrorField = firstName ? $('input#last') : $('input#first');
            }

            // Validate email
            const email = $('input[type="email"]').val().trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                const $emailField = $('input[type="email"]').closest('.signup-field');
                $emailField.addClass('has-error');
                $emailField.find('.error-message').text('Email is required').show();
                hasErrors = true;
                if (!firstErrorField) firstErrorField = $('input[type="email"]');
            } else if (!emailRegex.test(email)) {
                const $emailField = $('input[type="email"]').closest('.signup-field');
                $emailField.addClass('has-error');
                $emailField.find('.error-message').text('Email is invalid').show();
                hasErrors = true;
                if (!firstErrorField) firstErrorField = $('input[type="email"]');
            }

            // Validate password
            const password = $('input[name="password"]').val();
            if (!password) {
                const $passwordField = $('input[name="password"]').closest('.signup-field');
                $passwordField.addClass('has-error');
                $passwordField.find('.error-message').first().text('Password is required').show();
                hasErrors = true;
                if (!firstErrorField) firstErrorField = $('input[name="password"]');
            } else if (password.length < 8) {
                const $passwordField = $('input[name="password"]').closest('.signup-field');
                $passwordField.addClass('has-error');
                $passwordField.find('.error-message').first().text('Password must be at least 8 characters').show();
                hasErrors = true;
                if (!firstErrorField) firstErrorField = $('input[name="password"]');
            }

            // Validate confirm password
            const $confirmWrapper = $('.confirm-password-wrapper');
            if ($confirmWrapper.is(':visible')) {
                const confirmPassword = $('input[name="password_confirmation"]').val();
                if (!confirmPassword) {
                    const $passwordField = $('input[name="password_confirmation"]').closest('.signup-field');
                    $passwordField.addClass('has-error');
                    $passwordField.find('.confirm-error-message').text('Please confirm your password').show();
                    hasErrors = true;
                    if (!firstErrorField) firstErrorField = $('input[name="password_confirmation"]');
                } else if (password && confirmPassword !== password) {
                    const $passwordField = $('input[name="password_confirmation"]').closest('.signup-field');
                    $passwordField.addClass('has-error');
                    $passwordField.find('.confirm-error-message').text('Passwords do not match').show();
                    hasErrors = true;
                    if (!firstErrorField) firstErrorField = $('input[name="password_confirmation"]');
                }
            }

            // Focus first error or submit
            if (hasErrors && firstErrorField) {
                firstErrorField.focus();
            } else {
                $('.signup-form-rebuilt')[0].submit();
            }
        });

        // Clear errors on input
        $(document).on('input', '.signup-rebuilt-container input', function () {
            const $field = $(this).closest('.signup-field');
            $field.removeClass('has-error');
            $field.find('.error-message').hide();
        });
    };

    // ============================================
    // ADDITIONAL EVENT HANDLERS
    // ============================================

    $(document).ready(() => {
        // Registration form handler
        $(document).on('click', '#need-account .register.kn-button', () => {
            const checkInterval = setInterval(() => {
                if ($('#register_all_users').length) {
                    enhanceRegistrationForm();
                    clearInterval(checkInterval);
                }
            }, 300);
        });

        // Confirmation pages handler
        const confirmScenes = ['#kn-scene_1789', '#kn-scene_1791', '#kn-scene_1792', '#kn-scene_1811', '#kn-scene_258'];
        confirmScenes.forEach((scene) => {
            const checkInterval = setInterval(() => {
                if ($(scene).length) {
                    $(scene).closest('#knack-body').addClass('loginPage confirmPage');
                    $(scene).addClass('confirmation-scene');
                    clearInterval(checkInterval);
                }
            }, 300);
        });

        // Alternative confirmation watch
        $(document).on('click', '#knack-reset-pass button[type="submit"]', () => {
            console.log('Continue clicked - watching for confirmation...');

            let attempts = 0;
            const watchInterval = setInterval(() => {
                attempts++;

                if ($('#knack-reset-pass p:contains("An email will be sent")').length) {
                    console.log('Confirmation detected! Reconstructing...');
                    setTimeout(() => {
                        reconstructConfirmationPage();
                        clearInterval(watchInterval);
                    }, 100);
                }

                if (attempts > 100) {
                    clearInterval(watchInterval);
                }
            }, 100);
        });
    });

    // Enhance registration form (simple version)
    const enhanceRegistrationForm = () => {
        const $registerForm = $('#register_all_users');

        if (!$registerForm.find('.line').length) {
            const $ssoBtn = $registerForm.find('.google-sso-btn, .kn-button.is-sso');
            if ($ssoBtn.length) {
                const orDivider = '<div class="line"><div class="bg-emphasis"></div><span class="text-subtle">or</span><div class="bg-emphasis"></div></div>';
                $ssoBtn.closest('.control').after(orDivider);
            }
        }

        if (!$registerForm.find('.forget-pass').length) {
            const forgetPassHtml = '<div class="forget-pass"><a tabindex="5" class="ang-link" id="forgot-pass" href="#welcome-page/knack-password/forgot">Forget your password?</a></div>';
            $registerForm.find('.kn-input-password').after(forgetPassHtml);
        }
    };

    // ============================================
    // TEST FUNCTIONS
    // ============================================

    window.testLoginForm = function () {
        console.log('=== Login Form Test ===');
        console.log('Email placeholder:', $('.kn-login input[type="email"]').attr('placeholder'));
        console.log('Email label:', $('.kn-login label[for="email"]').text());
        console.log('Password placeholder:', $('.kn-login #password').attr('placeholder'));
        console.log('Form rebuilt:', $('.kn-login').hasClass('login-rebuilt'));
    };

    window.testConfirmationFix = () => {
        const $p = $('#knack-reset-pass p:contains("An email will be sent")');
        console.log('Found paragraph:', $p.length > 0);
        if ($p.length) {
            console.log('Text:', $p.text());
            reconstructConfirmationPage();
        }
    };
    // ============================================
    // FORM ASSISTANCE
    // ============================================

    $(document).on('knack-view-render.view_5444', function (event, view, data) {
        // Get the value from the details view field_3704
        var detailsValue = $('#view_5445 .field_3704 .kn-detail-body').text().trim();

        console.log('Details value found:', detailsValue); // Debug log

        // Check if the value exists and is not empty
        if (detailsValue && detailsValue !== '') {
            // Set the value in the form's number field
            $('#field_3606').val(detailsValue);
            console.log('Form field populated with:', detailsValue);

            // Make field read-only if value is not 0 or blank
            if (detailsValue !== '0' && detailsValue !== '0.00') {
                $('#field_3606').prop('readonly', true).css({
                    'background-color': '#f0f0f0',
                    'cursor': 'not-allowed'
                });
                console.log('Field made read-only');
            }
        } else {
            console.log('Details field is empty or not found');
            // Leave the field editable when blank
        }

        // Add validation function
        function validateOdometer() {
            var startValue = parseFloat($('#field_3606').val()) || 0;
            var finishValue = parseFloat($('#field_3607').val()) || 0;

            // Remove any existing error messages
            $('.odometer-error').remove();

            if (startValue > finishValue && finishValue !== 0) {
                // Create error message
                var errorHtml = '<div class="kn-message is-error odometer-error" style="margin: 10px 0;">' +
                    '<span class="kn-message-body">Odometer Start cannot be greater than Odometer Finish</span>' +
                    '</div>';

                // Insert error after the finish field
                $('#kn-input-field_3607').after(errorHtml);

                // Disable submit button
                $('#view_5444 .kn-submit button[type="submit"]').prop('disabled', true).css('opacity', '0.5');

                return false;
            } else {
                // Enable submit button if validation passes
                $('#view_5444 .kn-submit button[type="submit"]').prop('disabled', false).css('opacity', '1');
                return true;
            }
        }

        // Validate on field change
        $('#field_3606, #field_3607').on('change blur keyup', function () {
            validateOdometer();
        });

        // Validate on form submission
        $(document).on('knack-form-submit.view_5444', function (event, view, response) {
            if (!validateOdometer()) {
                event.preventDefault();
                return false;
            }
        });

        // Initial validation
        setTimeout(function () {
            validateOdometer();
        }, 500);
    });
    //Time Sheet Assistance
    $(document).on('knack-scene-render.any', function () {
        console.log('Universal Knack Popup Enhancer loaded');

        // Watch for ANY popup opening anywhere in the app
        var popupWatcher = setInterval(function () {
            var $popup = $('.drop-content:visible');

            if ($popup.length > 0 && !$popup.data('universal-enhanced')) {
                $popup.data('universal-enhanced', true);

                var popupTitle = $popup.find('h1.kn-title').text();
                console.log('Popup detected:', popupTitle);

                // Detect field type and enhance
                detectAndEnhancePopup($popup);
            }
        }, 100);
    });

    function detectAndEnhancePopup($popup) {
        // Detect field type by looking at the content

        // 1. Chosen dropdowns (Activity, Booking, etc.)
        if ($popup.find('.chzn-container').length) {
            console.log('Detected: Chosen dropdown');
            enhanceChosenDropdown($popup);
        }
        // 2. Native select dropdowns (Trip Type)
        else if ($popup.find('select.select').length) {
            console.log('Detected: Native select');
            enhanceNativeSelect($popup);
        }
        // 3. Address fields
        else if ($popup.find('input#street').length) {
            console.log('Detected: Address field');
            enhanceAddressField($popup);
        }
        // 4. Time fields
        else if ($popup.find('input.kn-time').length) {
            console.log('Detected: Time field');
            enhanceTimeField($popup);
        }
        // 5. Date fields
        else if ($popup.find('input.knack-date').length) {
            console.log('Detected: Date field');
            enhanceDateField($popup);
        }
        // 6. Textarea (Comments)
        else if ($popup.find('textarea').length) {
            console.log('Detected: Textarea');
            enhanceTextarea($popup);
        }
        // 7. Number/text inputs
        else if ($popup.find('input[type="text"]').length) {
            console.log('Detected: Text/number input');
            enhanceTextInput($popup);
        }

        // Add universal enter key submit (except for textareas)
        if (!$popup.find('textarea').length) {
            $popup.on('keypress.universal', 'input', function (e) {
                if (e.which === 13) {
                    e.preventDefault();
                    $popup.find('.kn-button.is-primary').click();
                }
            });
        }
    }

    // Individual enhancement functions
    function enhanceChosenDropdown($popup) {
        var attempts = 0;
        var checker = setInterval(function () {
            var $container = $popup.find('.chzn-container:visible');
            if ($container.length) {
                clearInterval(checker);
                // Open dropdown
                $container.find('a.chzn-single').trigger('mousedown');
                // Focus search
                setTimeout(function () {
                    $popup.find('.chzn-search input:visible').focus();
                }, 100);
            } else if (attempts++ > 20) {
                clearInterval(checker);
            }
        }, 50);
    }

    function enhanceNativeSelect($popup) {
        setTimeout(function () {
            var $select = $popup.find('select:visible').first();
            if ($select.length) {
                $select.focus();
                // Optional: show all options
                var optionCount = $select.find('option').length;
                if (optionCount <= 10) { // Only for small lists
                    $select.attr('size', optionCount);
                    $select.on('blur change', function () {
                        $(this).attr('size', 1);
                    });
                }
            }
        }, 100);
    }

    function enhanceAddressField($popup) {
        // Fix labels
        $popup.find('label:contains("City")').text('Suburb');
        $popup.find('label:contains("Province / Region")').text('State');

        // Google Maps integration
        if (window.google && window.google.maps) {
            initGoogleMapsForAddress($popup);
        }
    }

    function enhanceTimeField($popup) {
        setTimeout(function () {
            $popup.find('input.kn-time').focus().select();
        }, 100);
    }

    function enhanceDateField($popup) {
        setTimeout(function () {
            $popup.find('input.knack-date').focus().select();
        }, 100);
    }

    function enhanceTextarea($popup) {
        setTimeout(function () {
            $popup.find('textarea').focus();
        }, 100);

        // Ctrl+Enter to submit
        $popup.on('keydown.universal', 'textarea', function (e) {
            if (e.ctrlKey && e.which === 13) {
                e.preventDefault();
                $popup.find('.kn-button.is-primary').click();
            }
        });
    }

    function enhanceTextInput($popup) {
        setTimeout(function () {
            $popup.find('input[type="text"]:visible').first().focus().select();
        }, 100);
    }

    // ========================================================================
    // FORM VALIDATION AND WEBHOOK CONTROL SYSTEM
    // ========================================================================

    /**
     * Comprehensive form validation and webhook system
     * Manages validation rules per view and triggers webhooks on successful submission
     */
    window.FormValidationWebhookSystem = (function () {

        // ========================================================================
        // VALIDATION RULE DEFINITIONS
        // Define reusable validation rule types that can be applied to any field
        // ========================================================================
        const validationRuleTypes = {
            // Checkbox group validation (at least one selected)
            'checkbox-required': {
                validate: function (config, fieldValue, $field) {
                    const $checkboxes = $(config.selector + ':checked');
                    return {
                        isValid: $checkboxes.length > 0,
                        normalizedValue: fieldValue
                    };
                },
                defaultMessage: 'Please select at least one option'
            },

            // Name fields validation (first and last name required)
            'name-fields': {
                validate: function (config, fieldValue, $field) {
                    const firstName = $(config.selectors.first).val().trim();
                    const lastName = $(config.selectors.last).val().trim();

                    // Convert to proper case (capitalize first letter, lowercase rest)
                    function toProperCase(name) {
                        if (!name) return '';
                        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                    }

                    const properFirstName = toProperCase(firstName);
                    const properLastName = toProperCase(lastName);

                    // Update the fields if they were changed
                    if (firstName && firstName !== properFirstName) {
                        $(config.selectors.first).val(properFirstName);
                        console.log(`📝 First name corrected: '${firstName}' → '${properFirstName}'`);
                    }
                    if (lastName && lastName !== properLastName) {
                        $(config.selectors.last).val(properLastName);
                        console.log(`📝 Last name corrected: '${lastName}' → '${properLastName}'`);
                    }

                    return {
                        isValid: properFirstName.length > 0 && properLastName.length > 0,
                        normalizedValue: { first: properFirstName, last: properLastName }
                    };
                },
                defaultMessage: 'Both First and Last names are required',
                displayError: function (fieldId, message, utils) {
                    const $nameContainer = $('input[name="key"][value="' + fieldId + '"]').closest('.kn-input');
                    $nameContainer.addClass('kn-error');
                    let $nameErrorDiv = $nameContainer.find('.validation-error-message');
                    if ($nameErrorDiv.length === 0) {
                        $nameErrorDiv = $('<div class="kn-message is-error validation-error-message" style="margin-top: 5px;"><span class="kn-message-body"></span></div>');
                        $nameContainer.append($nameErrorDiv);
                    }
                    $nameErrorDiv.find('.kn-message-body').text(message);
                    $nameErrorDiv.show();
                },
                clearError: function (fieldId, utils) {
                    const $nameContainer = $('input[name="key"][value="' + fieldId + '"]').closest('.kn-input');
                    $nameContainer.removeClass('kn-error');
                    $nameContainer.find('.validation-error-message').remove();
                }
            },

            // Mobile number validation
            'mobile-number': {
                validate: function (config, fieldValue, $field) {
                    if (!fieldValue || fieldValue.trim() === '') {
                        return { isValid: true, normalizedValue: '' };
                    }
                    return validator.normalizeMobileNumber(fieldValue.trim());
                },
                defaultMessage: 'Please enter a valid mobile number'
            },

            // Landline number validation with extensions
            'landline-number': {
                validate: function (config, fieldValue, $field) {
                    if (!fieldValue || fieldValue.trim() === '') {
                        return { isValid: true, normalizedValue: '', hasAreaCodeCorrection: false };
                    }
                    return validator.normalizeLandlineNumber(fieldValue.trim());
                },
                defaultMessage: 'Please enter a valid phone number'
            },

            // Contact group validation (at least one contact method)
            'contact-group': {
                validate: function (config, fieldValue, $field) {
                    const email = $(config.selectors.email).val().trim();
                    const mobile = $(config.selectors.mobile).val().trim();
                    const phone = $(config.selectors.phone).val().trim();
                    return {
                        isValid: email.length > 0 || mobile.length > 0 || phone.length > 0,
                        normalizedValue: { email, mobile, phone }
                    };
                },
                defaultMessage: 'Please provide at least one contact method (Email, Mobile, or Phone)',
                displayError: function (fieldId, message, utils) {
                    utils.addFieldError('field_3959', message); // Show on email field
                },
                clearError: function (fieldId, utils) {
                    utils.removeFieldError('field_3959'); // Clear from email field only
                }
            },

            // Proper case text validation (auto-converts to Title Case)
            'proper-case-text': {
                validate: function (config, fieldValue, $field) {
                    if (!fieldValue || fieldValue.trim() === '') {
                        return { isValid: true, normalizedValue: '' };
                    }

                    const trimmed = fieldValue.trim();

                    // Convert to proper case (Title Case)
                    function toProperCase(text) {
                        return text.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
                    }

                    const properCaseValue = toProperCase(trimmed);

                    // Update the field if it was changed
                    if (trimmed !== properCaseValue) {
                        $field.val(properCaseValue);
                        console.log(`📝 Text corrected to Proper Case: '${trimmed}' → '${properCaseValue}'`);
                    }

                    return {
                        isValid: true,
                        normalizedValue: properCaseValue
                    };
                },
                defaultMessage: 'Text will be automatically formatted to Proper Case'
            }
        };

        // ========================================================================
        // VIEW CONFIGURATIONS
        // Define which validation rules apply to which fields in each view
        // ========================================================================
        const viewConfigs = {
            view_5518: {
                webhook: {
                    url: 'https://hook.us1.make.com/nwacilwm8c5sg3w5w2xd7qxwwp250fbu',
                    enabled: true
                },
                fields: {
                    field_3958: {
                        rule: 'checkbox-required',
                        selector: 'input[name="field_3958"]',
                        required: true,
                        message: 'Please select at least one role'
                    },
                    field_3967: {
                        rule: 'name-fields',
                        selectors: {
                            first: 'input[name="first"]',
                            last: 'input[name="last"]'
                        },
                        required: true
                    },
                    field_3960: {
                        rule: 'mobile-number',
                        selector: '#field_3960',
                        required: false
                    },
                    field_3961: {
                        rule: 'landline-number',
                        selector: '#field_3961',
                        required: false
                    },
                    field_3984: {
                        rule: 'proper-case-text',
                        selector: '#field_3984',
                        required: false
                    },
                    contact_group: {
                        rule: 'contact-group',
                        selectors: {
                            email: '#field_3959',
                            mobile: '#field_3960',
                            phone: '#field_3961'
                        },
                        required: true
                    }
                }
            },

            // ===== COMPANY CREATION FORM =====
            view_4059: {
                formType: 'company-creation',
                webhook: {
                    url: 'https://hook.us1.make.com/YOUR_WEBHOOK_URL_HERE',  // TODO: Add actual webhook URL
                    enabled: true
                },
                postSubmissionWebhook: {
                    url: 'https://hook.us1.make.com/YOUR_POST_WEBHOOK_URL_HERE',  // TODO: Add actual webhook URL
                    enabled: true
                },
                fields: {
                    field_4057: {
                        rule: 'company-email',
                        selector: '#field_4057',
                        required: false
                    },
                    field_4056: {
                        rule: 'company-phone',
                        selector: '#field_4056',
                        required: false
                    }
                }
            },

            // ===== COMPANY UPDATE FORM =====
            view_2406: {
                formType: 'company-update',
                webhook: {
                    url: 'https://hook.us1.make.com/YOUR_WEBHOOK_URL_HERE',  // TODO: Add actual webhook URL
                    enabled: true
                },
                postSubmissionWebhook: {
                    url: 'https://hook.us1.make.com/YOUR_POST_WEBHOOK_URL_HERE',  // TODO: Add actual webhook URL
                    enabled: true
                },
                // Hidden view that contains the existing record IDs
                hiddenView: {
                    viewId: 'view_5608',  // Details view with existing data
                    recordIds: {
                        company_record_id: '#view_5608 .field_XXXX .kn-detail-body span span',  // TODO: Add actual field
                        primary_email_record_id: '#view_5608 .field_YYYY .kn-detail-body span span',  // TODO: Add actual field
                        primary_phone_record_id: '#view_5608 .field_ZZZZ .kn-detail-body span span',  // TODO: Add actual field
                        primary_scn_record_id: '#view_5608 .field_WWWW .kn-detail-body span span'  // TODO: Add actual field
                    },
                    originalValues: {
                        company_name: '#view_5608 .field_AAAA .kn-detail-body',  // TODO: Add actual field
                        company_short_name: '#view_5608 .field_BBBB .kn-detail-body',  // TODO: Add actual field
                        street_address: '#view_5608 .field_CCCC .kn-detail-body',  // TODO: Add actual field
                        email: '#view_5608 .field_DDDD .kn-detail-body',  // TODO: Add actual field
                        phone: '#view_5608 .field_EEEE .kn-detail-body'  // TODO: Add actual field
                    }
                },
                fields: {
                    field_4057: {
                        rule: 'company-email',
                        selector: '#field_4057',
                        required: false
                    },
                    field_4056: {
                        rule: 'company-phone',
                        selector: '#field_4056',
                        required: false
                    }
                }
            }
        };

        // Track field interaction states
        const fieldInteractionStates = {};

        // Utility functions
        const utils = {
            /**
             * Adds error styling and message to a field
             */
            addFieldError: function (fieldId, message, customSelector = null) {
                const selector = customSelector || `#kn-input-${fieldId}`;
                const $field = $(selector);

                console.log(`🎯 Adding error to field: ${fieldId}, Selector: ${selector}, Field found: ${$field.length > 0}, Message: '${message}'`);

                $field.addClass('kn-error');

                // Create or update error message below the field using native Knack styling
                let $errorDiv = $field.find('.validation-error-message');
                if ($errorDiv.length === 0) {
                    $errorDiv = $('<div class="kn-message is-error validation-error-message" style="margin-top: 5px;"><span class="kn-message-body"></span></div>');
                    $field.append($errorDiv);
                    console.log(`➕ Created new error div for ${fieldId}`);
                } else {
                    console.log(`🔄 Updating existing error div for ${fieldId}`);
                }
                $errorDiv.find('.kn-message-body').text(message);
                $errorDiv.show();

                console.log(`❌ Validation error added to ${fieldId}: ${message}`);
            },

            /**
             * Removes error styling and message from a field
             */
            removeFieldError: function (fieldId, customSelector = null) {
                const selector = customSelector || `#kn-input-${fieldId}`;
                const $field = $(selector);

                $field.removeClass('kn-error');
                $field.find('.validation-error-message').remove();

                console.log(`✅ Validation error cleared from ${fieldId}`);
            },

            /**
             * Shows a summary of validation errors (optional - mainly for debugging)
             */
            showValidationSummary: function (messages, type = 'error') {
                // For now, we'll just log to console since errors are shown below fields
                console.log(`Validation Summary (${messages.length} errors):`, messages);
            },

            /**
             * Shows a custom green confirmation message for area code corrections
             */
            addConfirmationMessage: function (fieldId, message, customSelector = null) {
                const selector = customSelector || `#kn-input-${fieldId}`;
                const $field = $(selector);

                console.log(`🟢 Adding confirmation to field: ${fieldId}, Message: '${message}'`);

                // Remove any existing confirmation messages first
                $field.find('.validation-confirmation-message').remove();

                // Create confirmation message with green theme
                const $confirmDiv = $('<div class="kn-message validation-confirmation-message" style="margin-top: 5px; background-color: #e8f5e8; border: 1px solid #39b54a; color: #2d7a2d;"><span class="kn-message-body"></span></div>');
                $confirmDiv.find('.kn-message-body').text(message);
                $field.append($confirmDiv);

                console.log(`🟢 Confirmation message added to ${fieldId}: ${message}`);
            },

            /**
             * Removes confirmation message from a field
             */
            removeConfirmationMessage: function (fieldId, customSelector = null) {
                const selector = customSelector || `#kn-input-${fieldId}`;
                const $field = $(selector);
                $field.find('.validation-confirmation-message').remove();
            },

            /**
             * Focuses on the first field with an error
             */
            focusFirstError: function (viewId) {
                const config = viewConfigs[viewId];
                if (!config || !config.fields) return;

                // Check each field to find first error
                for (const fieldId in config.fields) {
                    const fieldConfig = config.fields[fieldId];

                    const $errorField = $(`#kn-input-${fieldId}`);
                    if ($errorField.hasClass('kn-error')) {
                        // Focus on the appropriate element based on rule type
                        if (fieldConfig.rule === 'checkbox-required') {
                            $(`${fieldConfig.selector}:first`).focus();
                        } else if (fieldConfig.rule === 'name-fields') {
                            $(fieldConfig.selectors.first).focus();
                        } else if (fieldConfig.rule === 'contact-group') {
                            $(fieldConfig.selectors.email).focus();
                        } else {
                            $(fieldConfig.selector).focus();
                        }
                        return;
                    }
                }
            }
        };

        // Field interaction tracking system
        const fieldTracker = {
            /**
             * Marks a field as interacted with
             */
            markFieldInteracted: function (viewId, fieldId) {
                if (!fieldInteractionStates[viewId]) {
                    fieldInteractionStates[viewId] = {};
                }
                fieldInteractionStates[viewId][fieldId] = true;
                console.log(`📝 Field interaction tracked: ${viewId}.${fieldId}`);
            },

            /**
             * Checks if a field has been interacted with
             */
            hasFieldBeenInteracted: function (viewId, fieldId) {
                return !!(fieldInteractionStates[viewId] && fieldInteractionStates[viewId][fieldId]);
            },

            /**
             * Resets interaction state for a view
             */
            resetViewInteractions: function (viewId) {
                if (fieldInteractionStates[viewId]) {
                    delete fieldInteractionStates[viewId];
                }
            }
        };

        // Validation engine
        const validator = {
            /**
             * Normalizes mobile number to standard format with country code
             */
            normalizeMobileNumber: function (input) {
                console.log(`📱 Cleaning mobile input: '${input}'`);

                // Remove all spaces, hyphens, parentheses, and dots
                let cleaned = input.replace(/[\s\-\(\)\.]/g, '');
                console.log(`🧹 Cleaned: '${cleaned}'`);

                // Extract country code and local number
                let countryCode = '';
                let localNumber = '';

                if (cleaned.startsWith('+')) {
                    // International format - extract country code
                    // Try specific patterns for common country codes first
                    const specificPatterns = [
                        /^\+61(\d+)$/,     // Australia
                        /^\+1(\d+)$/,      // US/Canada
                        /^\+44(\d+)$/,     // UK
                        /^\+33(\d+)$/,     // France
                        /^\+49(\d+)$/,     // Germany
                        /^\+81(\d+)$/,     // Japan
                        /^\+86(\d+)$/,     // China
                        /^\+91(\d+)$/,     // India
                    ];

                    let match = null;

                    // Try specific patterns first
                    for (const pattern of specificPatterns) {
                        match = cleaned.match(pattern);
                        if (match) {
                            countryCode = cleaned.substring(1, cleaned.length - match[1].length);
                            localNumber = match[1];
                            console.log(`🎯 Specific pattern match - Country: '${countryCode}', Local: '${localNumber}'`);
                            break;
                        }
                    }

                    // If no specific pattern matched, try generic patterns
                    if (!match) {
                        console.log(`🔍 No specific pattern matched, trying generic patterns...`);
                        const patterns = [
                            /^\+(\d{1})(\d+)$/,   // 1-digit country codes
                            /^\+(\d{2})(\d+)$/,   // 2-digit country codes
                            /^\+(\d{3})(\d+)$/,   // 3-digit country codes
                            /^\+(\d{4})(\d+)$/    // 4-digit country codes (fallback)
                        ];

                        for (const pattern of patterns) {
                            const testMatch = cleaned.match(pattern);
                            if (testMatch) {
                                const testCode = testMatch[1];
                                // Check if this country code is valid
                                const validCountryCodes = ['1', '44', '61', '86', '33', '49', '39', '34', '81', '82', '91', '55', '52', '27', '20', '971', '966', '962', '965', '973', '974', '968', '964', '98', '90', '30', '351', '31', '32', '41', '43', '45', '46', '47', '48', '420', '421', '36', '40', '359', '385', '381', '382', '386', '385', '372', '371', '370', '358', '354', '353'];
                                if (validCountryCodes.includes(testCode)) {
                                    match = testMatch;
                                    countryCode = testCode;
                                    localNumber = testMatch[2];
                                    break;
                                }
                            }
                        }
                    }

                    console.log(`🔍 Country code extraction - Input: '${cleaned}', Match: ${match ? 'SUCCESS' : 'FAILED'}`);
                    if (!match) {
                        return { isValid: false, error: 'Invalid country code format', normalizedValue: '' };
                    }

                    console.log(`🏁 Extracted - Country: '${countryCode}', Local: '${localNumber}'`);

                    // Validate common country codes (comprehensive list)
                    const validCountryCodes = ['1', '44', '61', '86', '33', '49', '39', '34', '81', '82', '91', '55', '52', '27', '20', '971', '966', '962', '965', '973', '974', '968', '964', '98', '90', '30', '351', '31', '32', '41', '43', '45', '46', '47', '48', '420', '421', '36', '40', '359', '385', '381', '382', '386', '385', '372', '371', '370', '358', '354', '353'];

                    console.log(`🔍 Country code validation - Code: '${countryCode}', Valid codes array includes it: ${validCountryCodes.includes(countryCode)}, Array length: ${validCountryCodes.length}`);
                    console.log(`🔍 First few valid codes: [${validCountryCodes.slice(0, 10).join(', ')}]`);

                    if (!validCountryCodes.includes(countryCode)) {
                        console.log(`❌ Country code '${countryCode}' not found in valid codes array`);
                        return { isValid: false, error: 'Invalid country code', normalizedValue: '' };
                    }

                    console.log(`✅ Country code '${countryCode}' is valid`);

                } else if (cleaned.startsWith('0061')) {
                    // Handle 0061 format (Australia)
                    countryCode = '61';
                    localNumber = cleaned.substring(4);
                } else if (cleaned.match(/^61[0-9]/)) {
                    // Handle 61 without + at start (Australia)
                    countryCode = '61';
                    localNumber = cleaned.substring(2);
                } else if (cleaned.startsWith('0')) {
                    // Australian number without country code
                    localNumber = cleaned;
                } else {
                    // Assume Australian number missing leading 0
                    localNumber = '0' + cleaned;
                }

                console.log(`🌍 Parsed - Country Code: '${countryCode}', Local Number: '${localNumber}'`);

                // For Australian numbers (country code 61 or no country code)
                if (countryCode === '61' || countryCode === '') {
                    // Remove leading 0 from local number if present and we have country code
                    if (countryCode === '61' && localNumber.startsWith('0')) {
                        localNumber = localNumber.substring(1);
                    }

                    // Validate Australian mobile number format
                    const australianMobilePattern = /^[45]/; // Australian mobiles start with 04 or 05 (after removing country code and leading 0)

                    if (countryCode === '61') {
                        // With country code: should be 9 digits starting with 4 or 5
                        console.log(`🇦🇺 AU validation with country code - Local: '${localNumber}', Length: ${localNumber.length}, Pattern test: ${australianMobilePattern.test(localNumber)}`);
                        if (localNumber.length !== 9 || !australianMobilePattern.test(localNumber)) {
                            console.log(`❌ AU mobile validation failed - Length: ${localNumber.length}, Pattern: ${australianMobilePattern.test(localNumber)}`);
                            return { isValid: false, error: 'Invalid Australian mobile number format', normalizedValue: '' };
                        }
                        console.log(`✅ AU mobile validation passed`);
                        return { isValid: true, normalizedValue: '+61' + localNumber, error: '' };
                    } else {
                        // Without country code: should be 10 digits starting with 04 or 05
                        console.log(`🇦🇺 AU validation without country code - Local: '${localNumber}', Length: ${localNumber.length}, Starts with 0: ${localNumber.startsWith('0')}, Pattern test: ${australianMobilePattern.test(localNumber.substring(1))}`);
                        if (localNumber.length !== 10 || !localNumber.startsWith('0') || !australianMobilePattern.test(localNumber.substring(1))) {
                            console.log(`❌ AU mobile validation failed - Length: ${localNumber.length}, Starts with 0: ${localNumber.startsWith('0')}, Pattern: ${australianMobilePattern.test(localNumber.substring(1))}`);
                            return { isValid: false, error: 'Invalid mobile number - should be 10 digits starting with 04 or 05', normalizedValue: '' };
                        }
                        console.log(`✅ AU mobile validation passed`);
                        return { isValid: true, normalizedValue: localNumber, error: '' };
                    }
                } else {
                    // International number - basic length validation
                    if (localNumber.length < 7 || localNumber.length > 15) {
                        return { isValid: false, error: 'Invalid mobile number length', normalizedValue: '' };
                    }
                    return { isValid: true, normalizedValue: '+' + countryCode + localNumber, error: '' };
                }
            },


            /**
             * Normalizes landline number with extension support and area code auto-correction
             */
            normalizeLandlineNumber: function (input) {
                console.log(`🏠 Cleaning landline input: '${input}'`);

                // Step 1: Check for extension delimiters
                const extensionDelimiters = /\s+(ext|extension|x)\s*\.?\s*:?\s*(\d{1,5})$/i;
                const otherDelimiters = /[,\/;|:]\s*(\d{1,5})$/;
                const colonDelimiters = /\s+Extension:\s*(\d{1,5})$/i;

                let mainNumber = input;
                let extension = '';
                let hasExtension = false;

                // Check for word-based extensions (ext, extension, x)
                let extMatch = input.match(extensionDelimiters);
                if (extMatch) {
                    mainNumber = input.replace(extensionDelimiters, '').trim();
                    extension = extMatch[2];
                    hasExtension = true;
                    console.log(`📞 Found extension with word delimiter: '${extMatch[1]}${extMatch[2]}', Main: '${mainNumber}', Ext: '${extension}'`);
                } else {
                    // Check for "Extension:" format
                    extMatch = input.match(colonDelimiters);
                    if (extMatch) {
                        mainNumber = input.replace(colonDelimiters, '').trim();
                        extension = extMatch[1];
                        hasExtension = true;
                        console.log(`📞 Found extension with colon: 'Extension: ${extMatch[1]}', Main: '${mainNumber}', Ext: '${extension}'`);
                    } else {
                        // Check for symbol-based extensions (, / ; |)
                        extMatch = input.match(otherDelimiters);
                        if (extMatch) {
                            mainNumber = input.replace(otherDelimiters, '').trim();
                            extension = extMatch[1];
                            hasExtension = true;
                            console.log(`📞 Found extension with symbol: '${extMatch[0]}', Main: '${mainNumber}', Ext: '${extension}'`);
                        }
                    }
                }

                // Validate extension if present
                if (hasExtension) {
                    if (extension.length === 0 || extension.length > 5) {
                        return { isValid: false, error: 'Extension must be 1-5 digits', normalizedValue: '', hasAreaCodeCorrection: false };
                    }
                }

                // Step 2: Check if input has a + at the beginning (before cleaning main number)
                const hasLeadingPlus = mainNumber.trim().startsWith('+');

                // Step 3: Remove ALL non-digit characters from main number
                let digitsOnly = mainNumber.replace(/\D/g, '');
                console.log(`🔢 Main number digits only: '${digitsOnly}'`);

                // Step 4: Check if we have any digits at all
                if (!digitsOnly || digitsOnly.length === 0) {
                    return { isValid: false, error: 'Please enter a valid phone number with digits', normalizedValue: '', hasAreaCodeCorrection: false };
                }

                // Step 5: Restore the + if it was at the beginning
                let cleaned = hasLeadingPlus ? '+' + digitsOnly : digitsOnly;
                console.log(`📞 Cleaned main number: '${cleaned}'`);

                // Step 6: Handle different landline formats
                let normalizedNumber = '';
                let hasAreaCodeCorrection = false;

                if (cleaned.startsWith('+61')) {
                    // International Australian format
                    let localPart = cleaned.substring(3);

                    // Remove leading 0 if present (international format doesn't need it)
                    if (localPart.startsWith('0')) {
                        localPart = localPart.substring(1);
                    }

                    console.log(`🇦🇺 International +61 - Local part: '${localPart}', Length: ${localPart.length}`);

                    // Handle missing area code for Australian numbers
                    if (localPart.length === 8) {
                        // Missing area code - add 03 (Melbourne default)
                        localPart = '3' + localPart; // International format doesn't have leading 0
                        hasAreaCodeCorrection = true;
                        console.log(`🎯 Added area code 3 to international: '${localPart}'`);
                    }

                    // Australian landlines should be 9 digits after +61
                    if (localPart.length < 9) {
                        return { isValid: false, error: 'Australian phone number too short', normalizedValue: '', hasAreaCodeCorrection: false };
                    }
                    if (localPart.length > 9) {
                        return { isValid: false, error: 'Australian phone number too long', normalizedValue: '', hasAreaCodeCorrection: false };
                    }

                    // Check if it starts with valid area code (without leading 0)
                    const areaCode = localPart.substring(0, 1); // First digit after +61
                    const validFirstDigits = ['2', '3', '7', '8']; // Corresponds to 02, 03, 07, 08
                    if (!validFirstDigits.includes(areaCode)) {
                        return { isValid: false, error: `Invalid Australian area code`, normalizedValue: '', hasAreaCodeCorrection: false };
                    }

                    normalizedNumber = '+61' + localPart;
                } else if (cleaned.startsWith('+') && !cleaned.startsWith('+61')) {
                    // Other international numbers - just normalize format, no validation
                    console.log(`🌍 Non-Australian international number: '${cleaned}'`);

                    // Simply clean and normalize - no length or format validation for other countries
                    normalizedNumber = cleaned;
                    console.log(`🌍 International number normalized: '${normalizedNumber}'`);
                } else if (cleaned.startsWith('0061')) {
                    // Alternative Australian international format
                    let localPart = cleaned.substring(4);

                    // Remove leading 0 if present
                    if (localPart.startsWith('0')) {
                        localPart = localPart.substring(1);
                    }

                    console.log(`🇦🇺 International 0061 - Local part: '${localPart}', Length: ${localPart.length}`);

                    // Handle missing area code for Australian numbers
                    if (localPart.length === 8) {
                        localPart = '3' + localPart; // Add 03 equivalent
                        hasAreaCodeCorrection = true;
                        console.log(`🎯 Added area code 3 to international 0061: '${localPart}'`);
                    }

                    if (localPart.length < 9) {
                        return { isValid: false, error: 'Australian phone number too short', normalizedValue: '', hasAreaCodeCorrection: false };
                    }
                    if (localPart.length > 9) {
                        return { isValid: false, error: 'Australian phone number too long', normalizedValue: '', hasAreaCodeCorrection: false };
                    }

                    const areaCode = localPart.substring(0, 1);
                    const validFirstDigits = ['2', '3', '7', '8'];
                    if (!validFirstDigits.includes(areaCode)) {
                        return { isValid: false, error: `Invalid Australian area code`, normalizedValue: '', hasAreaCodeCorrection: false };
                    }

                    normalizedNumber = '+61' + localPart;
                } else if (cleaned.match(/^61[0-9]/)) {
                    // 61 without + at start - treat as Australian international
                    let localPart = cleaned.substring(2);

                    if (localPart.startsWith('0')) {
                        localPart = localPart.substring(1);
                    }

                    console.log(`🇦🇺 International 61 - Local part: '${localPart}', Length: ${localPart.length}`);

                    // Handle missing area code for Australian numbers
                    if (localPart.length === 8) {
                        localPart = '3' + localPart; // Add 03 equivalent
                        hasAreaCodeCorrection = true;
                        console.log(`🎯 Added area code 3 to international 61: '${localPart}'`);
                    }

                    if (localPart.length < 9) {
                        return { isValid: false, error: 'Australian phone number too short', normalizedValue: '', hasAreaCodeCorrection: false };
                    }
                    if (localPart.length > 9) {
                        return { isValid: false, error: 'Australian phone number too long', normalizedValue: '', hasAreaCodeCorrection: false };
                    }

                    const areaCode = localPart.substring(0, 1);
                    const validFirstDigits = ['2', '3', '7', '8'];
                    if (!validFirstDigits.includes(areaCode)) {
                        return { isValid: false, error: `Invalid Australian area code`, normalizedValue: '', hasAreaCodeCorrection: false };
                    }

                    normalizedNumber = '+61' + localPart;
                } else if (cleaned.startsWith('0')) {
                    // Australian number with area code
                    if (cleaned.length < 10) {
                        return { isValid: false, error: 'Phone number too short - should be 10 digits including area code', normalizedValue: '', hasAreaCodeCorrection: false };
                    }
                    if (cleaned.length > 10) {
                        return { isValid: false, error: 'Too many numbers in phone number', normalizedValue: '', hasAreaCodeCorrection: false };
                    }

                    // Validate Australian area codes
                    const areaCode = cleaned.substring(0, 2);
                    const validAreaCodes = ['02', '03', '07', '08'];
                    if (!validAreaCodes.includes(areaCode)) {
                        return { isValid: false, error: `Invalid Australian area code: ${areaCode}`, normalizedValue: '', hasAreaCodeCorrection: false };
                    }

                    normalizedNumber = cleaned;
                } else {
                    // No area code - assume Melbourne (03) and add it
                    if (cleaned.length === 8) {
                        normalizedNumber = '03' + cleaned;
                        hasAreaCodeCorrection = true;
                        console.log(`🎯 Added area code 03 to: '${cleaned}' → '${normalizedNumber}'`);
                    } else if (cleaned.length < 8) {
                        return { isValid: false, error: 'Phone number too short', normalizedValue: '', hasAreaCodeCorrection: false };
                    } else {
                        return { isValid: false, error: 'Too many numbers in phone number', normalizedValue: '', hasAreaCodeCorrection: false };
                    }
                }

                // Step 7: Add extension back if present
                const finalNumber = hasExtension ? `${normalizedNumber} ext ${extension}` : normalizedNumber;

                console.log(`🏠 Landline validation complete: '${finalNumber}', Area code correction: ${hasAreaCodeCorrection}`);

                return {
                    isValid: true,
                    normalizedValue: finalNumber,
                    hasAreaCodeCorrection: hasAreaCodeCorrection,
                    error: ''
                };
            },

            /**
             * Normalizes mobile number to standard format
             */
            normalizeMobileNumber: function (input) {
                console.log(`🧹 Cleaning input: '${input}'`);

                // Step 1: Check if input has a + at the beginning (before cleaning)
                const hasLeadingPlus = input.trim().startsWith('+');

                // Step 2: Remove ALL non-digit characters from the entire string
                let digitsOnly = input.replace(/\D/g, '');
                console.log(`🔢 Digits only: '${digitsOnly}'`);

                // Step 3: Check if we have any digits at all
                if (!digitsOnly || digitsOnly.length === 0) {
                    return { isValid: false, error: 'Please enter a valid mobile number with digits', normalizedValue: '' };
                }

                // Step 4: Restore the + if it was at the beginning
                let cleaned = hasLeadingPlus ? '+' + digitsOnly : digitsOnly;
                console.log(`📞 Cleaned with + restored: '${cleaned}'`);

                // Step 5: Early return for missing country code parsing details
                if (!cleaned.startsWith('+') && !cleaned.startsWith('0061') && !cleaned.match(/^61[0-9]/) && !cleaned.startsWith('0') && cleaned.length > 0) {
                    console.log(`🔧 Adding missing leading 0 to: '${cleaned}'`);
                    cleaned = '0' + cleaned;
                }

                // Handle country code scenarios
                let countryCode = '';
                let localNumber = '';

                if (cleaned.startsWith('+')) {
                    // Extract country code - try specific patterns first, then fallback
                    let match = null;

                    // Try common country codes first (1-3 digits)
                    if (cleaned.match(/^\+1\d/)) {
                        // US/Canada: +1
                        match = cleaned.match(/^\+1(.*)$/);
                        countryCode = '1';
                        localNumber = match[1];
                    } else if (cleaned.match(/^\+61\d/)) {
                        // Australia: +61
                        match = cleaned.match(/^\+61(.*)$/);
                        countryCode = '61';
                        localNumber = match[1];
                    } else if (cleaned.match(/^\+44\d/)) {
                        // UK: +44
                        match = cleaned.match(/^\+44(.*)$/);
                        countryCode = '44';
                        localNumber = match[1];
                    } else {
                        // Generic pattern: try 1-3 digits, prefer shorter codes
                        const patterns = [
                            /^\+(\d{1})(.*)$/,  // 1 digit codes
                            /^\+(\d{2})(.*)$/,  // 2 digit codes
                            /^\+(\d{3})(.*)$/   // 3 digit codes
                        ];

                        for (const pattern of patterns) {
                            const testMatch = cleaned.match(pattern);
                            if (testMatch) {
                                const testCode = testMatch[1];
                                // Check if this country code is valid
                                const validCountryCodes = ['1', '44', '61', '86', '33', '49', '39', '34', '81', '82', '91', '55', '52', '27', '20', '971', '966', '962', '965', '973', '974', '968', '964', '98', '90', '30', '351', '31', '32', '41', '43', '45', '46', '47', '48', '420', '421', '36', '40', '359', '385', '381', '382', '386', '385', '372', '371', '370', '358', '354', '353'];
                                if (validCountryCodes.includes(testCode)) {
                                    match = testMatch;
                                    countryCode = testCode;
                                    localNumber = testMatch[2];
                                    break;
                                }
                            }
                        }
                    }

                    console.log(`🔍 Country code extraction - Input: '${cleaned}', Match: ${match ? 'SUCCESS' : 'FAILED'}`);
                    if (!match) {
                        return { isValid: false, error: 'Invalid country code format', normalizedValue: '' };
                    }

                    console.log(`🏁 Extracted - Country: '${countryCode}', Local: '${localNumber}'`);

                    // Validate common country codes (comprehensive list)
                    const validCountryCodes = ['1', '44', '61', '86', '33', '49', '39', '34', '81', '82', '91', '55', '52', '27', '20', '971', '966', '962', '965', '973', '974', '968', '964', '98', '90', '30', '351', '31', '32', '41', '43', '45', '46', '47', '48', '420', '421', '36', '40', '359', '385', '381', '382', '386', '385', '372', '371', '370', '358', '354', '353'];

                    console.log(`🔍 Country code validation - Code: '${countryCode}', Valid codes array includes it: ${validCountryCodes.includes(countryCode)}, Array length: ${validCountryCodes.length}`);
                    console.log(`🔍 First few valid codes: [${validCountryCodes.slice(0, 10).join(', ')}]`);

                    if (!validCountryCodes.includes(countryCode)) {
                        console.log(`❌ Country code '${countryCode}' not found in valid codes array`);
                        return { isValid: false, error: 'Invalid country code', normalizedValue: '' };
                    }

                    console.log(`✅ Country code '${countryCode}' is valid`);

                } else if (cleaned.startsWith('0061')) {
                    // Handle 0061 format (Australia)
                    countryCode = '61';
                    localNumber = cleaned.substring(4);
                } else if (cleaned.match(/^61[0-9]/)) {
                    // Handle 61 without + at start (Australia)
                    countryCode = '61';
                    localNumber = cleaned.substring(2);
                } else if (cleaned.startsWith('0')) {
                    // Australian number without country code
                    localNumber = cleaned;
                } else {
                    // Assume Australian number missing leading 0
                    localNumber = '0' + cleaned;
                }

                console.log(`🌍 Parsed - Country Code: '${countryCode}', Local Number: '${localNumber}'`);

                // For Australian numbers (country code 61 or no country code)
                if (countryCode === '61' || countryCode === '') {
                    // Remove leading 0 from local number if present and we have country code
                    if (countryCode === '61' && localNumber.startsWith('0')) {
                        localNumber = localNumber.substring(1);
                    }

                    // Validate Australian mobile number format
                    const australianMobilePattern = /^[45]/; // Australian mobiles start with 04 or 05 (after removing country code and leading 0)

                    if (countryCode === '61') {
                        // With country code: should be 9 digits starting with 4 or 5
                        console.log(`🇦🇺 AU validation with country code - Local: '${localNumber}', Length: ${localNumber.length}, Pattern test: ${australianMobilePattern.test(localNumber)}`);
                        if (localNumber.length !== 9 || !australianMobilePattern.test(localNumber)) {
                            console.log(`❌ AU mobile validation failed - Length: ${localNumber.length}, Pattern: ${australianMobilePattern.test(localNumber)}`);
                            return { isValid: false, error: 'Invalid Australian mobile number format', normalizedValue: '' };
                        }
                        console.log(`✅ AU mobile validation passed`);
                        return { isValid: true, normalizedValue: '+61' + localNumber, error: '' };
                    } else {
                        // Without country code: should be 10 digits starting with 04 or 05
                        console.log(`🇦🇺 AU validation without country code - Local: '${localNumber}', Length: ${localNumber.length}, Starts with 0: ${localNumber.startsWith('0')}, Pattern test: ${australianMobilePattern.test(localNumber.substring(1))}`);
                        if (localNumber.length !== 10 || !localNumber.startsWith('0') || !australianMobilePattern.test(localNumber.substring(1))) {
                            console.log(`❌ AU mobile validation failed - Length: ${localNumber.length}, Starts with 0: ${localNumber.startsWith('0')}, Pattern: ${australianMobilePattern.test(localNumber.substring(1))}`);
                            return { isValid: false, error: 'Invalid mobile number - should be 10 digits starting with 04 or 05', normalizedValue: '' };
                        }
                        console.log(`✅ AU mobile validation passed`);
                        return { isValid: true, normalizedValue: localNumber, error: '' };
                    }
                } else {
                    // International number - basic length validation
                    if (localNumber.length < 7 || localNumber.length > 15) {
                        return { isValid: false, error: 'Invalid mobile number length', normalizedValue: '' };
                    }
                    return { isValid: true, normalizedValue: '+' + countryCode + localNumber, error: '' };
                }
            },

            /**
             * Validates all rules for a specific view
             */
            validateView: function (viewId) {
                const config = viewConfigs[viewId];
                if (!config || !config.fields) return { isValid: true, errors: [] };

                let isValid = true;
                const errors = [];

                for (const fieldId in config.fields) {
                    const fieldConfig = config.fields[fieldId];
                    if (!fieldConfig.rule) continue;

                    const ruleDefinition = validationRuleTypes[fieldConfig.rule];
                    if (!ruleDefinition) {
                        console.warn(`Unknown validation rule: ${fieldConfig.rule} for field ${fieldId}`);
                        continue;
                    }

                    // Get field value
                    const $field = $(fieldConfig.selector);
                    const fieldValue = $field.val() || '';

                    // Run the validation
                    const result = ruleDefinition.validate(fieldConfig, fieldValue, $field);
                    const fieldValid = result.isValid;

                    if (!fieldValid) {
                        const errorMessage = fieldConfig.message || ruleDefinition.defaultMessage;
                        utils.addFieldError(fieldId, errorMessage);
                        errors.push(errorMessage);
                        console.log(`❌ ${fieldConfig.rule} validation failed for ${fieldId}: ${errorMessage}`);
                        isValid = false;
                    } else {
                        utils.removeFieldError(fieldId);

                        // Update field with normalized value if provided
                        if (result.normalizedValue && result.normalizedValue !== fieldValue) {
                            $field.val(result.normalizedValue);
                            console.log(`🔄 Field ${fieldId} normalized: ${result.normalizedValue}`);
                        }

                        // Handle special cases for certain rule types
                        if (fieldConfig.rule === 'landline-number') {
                            utils.removeConfirmationMessage(fieldId);
                            if (result.hasAreaCodeCorrection) {
                                utils.addConfirmationMessage(fieldId, 'Please confirm area code');
                                console.log(`🟢 Area code confirmation shown for ${fieldId}`);
                            }
                        }

                        console.log(`✅ ${fieldConfig.rule} validation passed for ${fieldId}`);
                    }
                }

                return { isValid, errors };
            }
        };

        // Webhook system
        const webhookManager = {
            /**
             * Fires webhook for successful form submission
             */
            fireWebhook: function (viewId, formData) {
                const config = viewConfigs[viewId];
                if (!config || !config.webhook.enabled || !config.webhook.url) {
                    console.log(`🔗 Webhook not configured for ${viewId}`);
                    return;
                }

                // Get current user information
                let currentUserId = null;
                let currentUserEmail = null;
                try {
                    if (Knack && Knack.getUserAttributes) {
                        const userAttrs = Knack.getUserAttributes();
                        currentUserId = userAttrs.id || null;
                        currentUserEmail = userAttrs.email || null;
                        console.log(`👤 Current user: ID=${currentUserId}, Email=${currentUserEmail}`);
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not get current user info:`, error);
                }

                const payload = {
                    view: viewId,
                    timestamp: new Date().toISOString(),
                    current_user: {
                        id: currentUserId,
                        email: currentUserEmail
                    },
                    formData: formData
                };

                console.log(`🚀 Firing webhook for ${viewId}:`, payload);

                fetch(config.webhook.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                })
                    .then(response => {
                        if (response.ok) {
                            console.log(`✅ Webhook fired successfully for ${viewId}`);
                        } else {
                            console.error(`❌ Webhook failed for ${viewId}:`, response.status);
                        }
                    })
                    .catch(error => {
                        console.error(`❌ Webhook error for ${viewId}:`, error);
                    });
            },

            /**
             * Fires webhook and returns promise for duplicate checking
             */
            fireWebhookWithDuplicateCheck: function (viewId, formData, $form, $submitBtn, originalText) {
                const config = viewConfigs[viewId];
                if (!config || !config.webhook.enabled || !config.webhook.url) {
                    console.log(`🔗 Webhook not configured for ${viewId}`);
                    return Promise.reject('Webhook not configured');
                }

                // Get current user information
                let currentUserId = null;
                let currentUserEmail = null;
                try {
                    if (Knack && Knack.getUserAttributes) {
                        const userAttrs = Knack.getUserAttributes();
                        currentUserId = userAttrs.id || null;
                        currentUserEmail = userAttrs.email || null;
                        console.log(`👤 Current user: ID=${currentUserId}, Email=${currentUserEmail}`);
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not get current user info:`, error);
                }

                // Extract company_id from URL hash
                // URL format: #segment1/segment2/company_id/segment4/...
                // Extract the third segment (index 2) after the hash
                let companyId = null;
                try {
                    const hash = window.location.hash;
                    if (hash) {
                        // Remove leading '#' and split by '/'
                        const segments = hash.replace(/^#/, '').split('/');
                        // Get the third segment (index 2)
                        if (segments.length >= 3 && segments[2]) {
                            companyId = segments[2];
                            console.log(`🏢 Extracted company_id from URL: ${companyId}`);
                        } else {
                            console.warn(`⚠️ URL hash does not have enough segments: ${hash}`);
                        }
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not extract company_id from URL:`, error);
                }

                const payload = {
                    view: viewId,
                    timestamp: new Date().toISOString(),
                    company_id: companyId,
                    current_user: {
                        id: currentUserId,
                        email: currentUserEmail
                    },
                    formData: formData
                };

                console.log(`🔗 Firing webhook with duplicate check for ${viewId} to ${config.webhook.url}`, payload);

                return fetch(config.webhook.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                    signal: AbortSignal.timeout(20000) // 20 second timeout
                })
                    .then(response => {
                        console.log(`📡 Webhook response status: ${response.status} ${response.statusText}`);
                        console.log(`📡 Webhook response headers:`, response.headers);

                        if (response.ok) {
                            return response.text(); // Get text first to debug
                        } else {
                            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                        }
                    })
                    .then(responseText => {
                        console.log(`📡 Raw webhook response:`, responseText);

                        try {
                            const result = JSON.parse(responseText);
                            console.log(`✅ Parsed webhook response for ${viewId}:`, result);
                            return result;
                        } catch (parseError) {
                            console.error(`❌ Failed to parse JSON response:`, parseError);
                            console.error(`❌ Response text was:`, responseText);
                            throw new Error(`Invalid JSON response: ${parseError.message}`);
                        }
                    });
            }
        };

        // ========================================================================
        // DUPLICATE DETECTION HANDLER
        // Handles async duplicate checking and response processing
        // ========================================================================
        const duplicateHandler = {

            /**
             * Handle the duplicate detection response
             */
            handleDuplicateResponse: function (response, formData, viewId, $form, $submitBtn, originalText) {
                console.log('🔄 Processing duplicate detection response:', response);

                // Extract the actual response (Make.com returns array)
                const result = Array.isArray(response) ? response[0] : response;
                const action = result.action_required;

                switch (action) {
                    case 'block':
                        this.blockSubmission(result, viewId, $form, $submitBtn, originalText);
                        break;

                    case 'confirm':
                        this.showConfirmationDialog(result, formData, viewId, $form, $submitBtn, originalText);
                        break;

                    case 'proceed':
                        this.proceedWithSubmission(formData, viewId);
                        break;

                    default:
                        console.error('Unknown action required:', action);
                        this.showError('Unexpected validation response. Please try again.');
                        $submitBtn.prop('disabled', false).text(originalText);
                }
            },

            /**
             * Block submission with duplicate message
             */
            blockSubmission: function (result, viewId, $form, $submitBtn, originalText) {
                console.log('🚫 Blocking submission due to duplicates');

                // Clear any existing errors
                $form.find('.kn-message.is-error').remove();

                // Show block message using native Knack styling
                const $errorDiv = $('<div class="kn-message is-error"></div>');
                $errorDiv.html(`
                    <span class="kn-message-body">
                        <p><strong>Duplicate Contact Detected</strong></p>
                        <p>${result.messages.block_message}</p>
                        <p>Please use the existing contact or modify the details.</p>
                    </span>
                `);

                $form.prepend($errorDiv);

                // Scroll to error
                $errorDiv[0].scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Re-enable the submit button
                $submitBtn.prop('disabled', false).text(originalText);
            },

            /**
             * Show confirmation dialog for conflicts
             */
            showConfirmationDialog: function (result, formData, viewId, $form, $submitBtn, originalText) {
                console.log('❓ Showing confirmation dialog for conflicts');

                const conflicts = result.conflicts;

                // Build confirmation message
                let confirmMessage = '<div style="text-align: left;">';
                confirmMessage += '<p><strong>Contact conflicts detected:</strong></p><ul>';

                conflicts.forEach(conflict => {
                    const contactMethod = conflict.type === 'mobile' ? 'Mobile' :
                        conflict.type === 'phone' ? 'Phone' : 'Email';
                    confirmMessage += `<li><strong>${contactMethod}:</strong> ${conflict.contact_value} is already associated with <strong>${conflict.existing_contact}</strong></li>`;
                });

                confirmMessage += '</ul>';
                confirmMessage += `<p>Do you want to associate these contact methods with <strong>${formData.first} ${formData.last}</strong> as well?</p>`;
                confirmMessage += '</div>';

                // Create custom modal dialog
                const $modal = $(`
                    <div id="duplicate-confirmation-modal" style="
                        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0,0,0,0.5); z-index: 9999; display: flex;
                        align-items: center; justify-content: center;
                    ">
                        <div style="
                            background: white; padding: 30px; border-radius: 8px;
                            max-width: 500px; margin: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                        ">
                            <h3 style="margin-top: 0; color: #333;">Confirm Contact Association</h3>
                            ${confirmMessage}
                            <div style="margin-top: 20px; text-align: right;">
                                <button id="cancel-association" style="
                                    background: #ccc; color: #333; border: none; padding: 10px 20px;
                                    margin-right: 10px; border-radius: 4px; cursor: pointer;
                                ">Cancel</button>
                                <button id="confirm-association" style="
                                    background: #007cba; color: white; border: none; padding: 10px 20px;
                                    border-radius: 4px; cursor: pointer;
                                ">Yes, Associate</button>
                            </div>
                        </div>
                    </div>
                `);

                $('body').append($modal);

                // Handle confirmation
                $('#confirm-association').on('click', () => {
                    $modal.remove();
                    this.proceedWithAssociation(formData, result, viewId);
                });

                // Handle cancellation
                $('#cancel-association').on('click', () => {
                    $modal.remove();
                    $submitBtn.prop('disabled', false).text(originalText);
                });
            },

            /**
             * Proceed with association after user confirmation
             */
            proceedWithAssociation: function (formData, result, viewId) {
                console.log('✅ User confirmed association, proceeding');

                // Set validation flag to "No" (unvalidated - will be updated after processing)
                this.setValidationFlag(viewId, 'No');

                // Show green success message
                this.showSuccessMessage('✅ Conflicts resolved - submitting contact...');

                const enhancedFormData = {
                    ...formData,
                    associate_existing: true,
                    create_mobile: result.create_mobile,
                    create_phone: result.create_phone,
                    create_email: result.create_email,
                    conflict_resolution: 'associate'
                };

                // Submit the form (webhook will fire during normal submission)
                setTimeout(() => {
                    this.submitForm(viewId);
                }, 1500); // Brief delay to show success message
            },

            /**
             * Proceed with normal submission (no conflicts)
             */
            proceedWithSubmission: function (formData, viewId) {
                console.log('✅ No conflicts detected, proceeding with submission');

                // Set validation flag to "No" (unvalidated - will be updated after processing)
                this.setValidationFlag(viewId, 'No');

                // Show green success message
                this.showSuccessMessage('✅ Data validated - no duplicates found. Submitting...');

                const enhancedFormData = {
                    ...formData,
                    create_mobile: true,
                    create_phone: true,
                    create_email: true,
                    conflict_resolution: 'none'
                };

                // Submit the form (webhook will fire during normal submission)
                setTimeout(() => {
                    this.submitForm(viewId);
                }, 1500); // Brief delay to show success message
            },

            /**
             * Submit the form programmatically
             */
            submitForm: function (viewId) {
                console.log(`📤 Submitting form for ${viewId}`);

                // Set a flag to skip validation since we already validated
                window.skipValidationForSubmit = true;

                // Trigger Knack's native form submission
                setTimeout(() => {
                    const $form = $(`#${viewId} form`);
                    $form.off('submit'); // Remove our listeners temporarily

                    // Reset submit button
                    const $submitBtn = $form.find('button[type="submit"]');
                    $submitBtn.prop('disabled', false).text('Submit');

                    $form.submit(); // Submit the form

                    // Clear the skip flag after a delay
                    setTimeout(() => {
                        window.skipValidationForSubmit = false;
                    }, 1000);
                }, 100);
            },

            /**
             * Show generic error message
             */
            showError: function (message) {
                const $errorDiv = $('<div class="kn-message is-error" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 10000;"></div>');
                $errorDiv.html(`
                    <span class="kn-message-body">
                        <p><strong>Validation Error</strong></p>
                        <p>${message}</p>
                    </span>
                `);

                $('body').prepend($errorDiv);

                // Auto-remove after 5 seconds
                setTimeout(() => {
                    $errorDiv.fadeOut(() => $errorDiv.remove());
                }, 5000);
            },

            /**
             * Show green success message (same style as area code correction)
             */
            showSuccessMessage: function (message) {
                const $successDiv = $('<div class="kn-message" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 10000; background: #4caf50; border: 1px solid #4caf50;"></div>');
                $successDiv.html(`
                    <span class="kn-message-body" style="color: white;">
                        <p><strong>${message}</strong></p>
                    </span>
                `);

                $('body').prepend($successDiv);

                // Auto-remove after 3 seconds
                setTimeout(() => {
                    $successDiv.fadeOut(() => $successDiv.remove());
                }, 3000);
            },

            /**
             * Set the validation flag field
             */
            setValidationFlag: function (viewId, value) {
                // Try different possible selectors for the validation flag field
                const selectors = [
                    `#${viewId}_field_3980`,           // Standard format
                    `#view_${viewId}_field_3980`,      // Alternative format
                    `input[name="field_3980"]`,        // By name attribute
                    `select[name="field_3980"]`        // If it's a dropdown
                ];

                let $field = null;
                for (const selector of selectors) {
                    $field = $(selector);
                    if ($field.length > 0) {
                        console.log(`📝 Found validation flag field with selector: ${selector}`);
                        break;
                    }
                }

                if ($field && $field.length > 0) {
                    // Handle different field types
                    if ($field.is('select')) {
                        // Dropdown field
                        $field.val(value).trigger('change');
                        console.log(`✅ Set validation flag to: ${value} (dropdown)`);
                    } else if ($field.is('input[type="radio"]')) {
                        // Radio buttons
                        $field.filter(`[value="${value}"]`).prop('checked', true).trigger('change');
                        console.log(`✅ Set validation flag to: ${value} (radio)`);
                    } else {
                        // Text input or other
                        $field.val(value).trigger('change');
                        console.log(`✅ Set validation flag to: ${value} (input)`);
                    }
                } else {
                    console.warn(`⚠️ Could not find validation flag field (field_3980) in ${viewId}`);
                    console.log(`⚠️ Tried selectors:`, selectors);
                }
            }
        };

        // ========================================================================
        // TEST DATA GENERATOR (for development/testing)
        // ========================================================================
        const testDataGenerator = {
            firstNames: ['James', 'Sarah', 'Michael', 'Emma', 'David', 'Olivia', 'Daniel', 'Sophie', 'Matthew', 'Emily',
                'Christopher', 'Jessica', 'Andrew', 'Isabella', 'Joshua', 'Charlotte', 'Ryan', 'Mia', 'Thomas', 'Grace'],
            lastNames: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Anderson', 'Thomas', 'Roberts', 'Johnson',
                'Davis', 'Miller', 'White', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Lee'],
            companies: ['Ace Industries', 'Beta Solutions', 'Coastal Services', 'Delta Group', 'Elite Systems',
                'Frontier Tech', 'Global Partners', 'Horizon Enterprises', 'Innovation Labs', 'Keystone Co'],

            /**
             * Generates random first name
             */
            randomFirstName: function () {
                return this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
            },

            /**
             * Generates random last name
             */
            randomLastName: function () {
                return this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
            },

            /**
             * Generates random company name
             */
            randomCompany: function () {
                return this.companies[Math.floor(Math.random() * this.companies.length)];
            },

            /**
             * Generates valid Australian mobile number
             */
            randomMobile: function () {
                const prefix = Math.random() > 0.5 ? '04' : '05';
                const rest = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
                return prefix + rest;
            },

            /**
             * Generates valid Australian landline number
             */
            randomLandline: function () {
                const areaCodes = ['02', '03', '07', '08'];
                const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
                const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
                return areaCode + number;
            },

            /**
             * Generates random email from name
             */
            randomEmail: function (firstName, lastName) {
                const domains = ['example.com', 'test.com.au', 'demo.net.au', 'sample.com.au'];
                const domain = domains[Math.floor(Math.random() * domains.length)];
                return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
            },

            /**
             * Prefills form with random valid data
             */
            prefillForm: function (viewId) {
                console.log(`🎲 Prefilling form ${viewId} with random test data`);

                const config = viewConfigs[viewId];
                if (!config || !config.fields) {
                    console.warn(`⚠️ No configuration found for ${viewId}`);
                    return;
                }

                const firstName = this.randomFirstName();
                const lastName = this.randomLastName();

                // Prefill each field based on its rule type
                for (const fieldId in config.fields) {
                    const fieldConfig = config.fields[fieldId];

                    switch (fieldConfig.rule) {
                        case 'checkbox-required':
                            // Select random checkboxes (at least one)
                            const $checkboxes = $(fieldConfig.selector);
                            const numToSelect = Math.floor(Math.random() * $checkboxes.length) + 1;
                            $checkboxes.each(function (index) {
                                if (index < numToSelect) {
                                    $(this).prop('checked', true).trigger('change');
                                }
                            });
                            console.log(`✓ Prefilled checkboxes: ${fieldId}`);
                            break;

                        case 'name-fields':
                            $(fieldConfig.selectors.first).val(firstName).trigger('input');
                            $(fieldConfig.selectors.last).val(lastName).trigger('input');
                            console.log(`✓ Prefilled name: ${firstName} ${lastName}`);
                            break;

                        case 'mobile-number':
                            const mobile = this.randomMobile();
                            $(fieldConfig.selector).val(mobile).trigger('blur');
                            console.log(`✓ Prefilled mobile: ${mobile}`);
                            break;

                        case 'landline-number':
                            const landline = this.randomLandline();
                            $(fieldConfig.selector).val(landline).trigger('blur');
                            console.log(`✓ Prefilled landline: ${landline}`);
                            break;

                        case 'proper-case-text':
                            const company = this.randomCompany();
                            $(fieldConfig.selector).val(company).trigger('blur');
                            console.log(`✓ Prefilled text: ${company}`);
                            break;

                        case 'contact-group':
                            // Prefill email (always), and randomly include mobile or phone
                            const email = this.randomEmail(firstName, lastName);
                            $(fieldConfig.selectors.email).val(email).trigger('input');
                            console.log(`✓ Prefilled email: ${email}`);
                            break;
                    }
                }

                console.log('🎲 Test data prefill complete');
            },

            /**
             * Adds a "Fill Test Data" button to the form
             */
            addPrefillButton: function (viewId) {
                const $form = $(`#${viewId} form`);
                if ($form.length === 0) return;

                // Check if button already exists
                if ($form.find('.test-data-prefill-btn').length > 0) return;

                // Create button with Knack styling
                const $button = $(`
                    <div style="margin-bottom: 15px; padding: 10px; background: #f0f8ff; border: 1px dashed #007cba; border-radius: 4px;">
                        <button type="button" class="test-data-prefill-btn" style="
                            background: #007cba;
                            color: white;
                            border: none;
                            padding: 8px 16px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                        ">🎲 Fill Test Data</button>
                        <span style="margin-left: 10px; font-size: 12px; color: #666;">Development/Testing Only</span>
                    </div>
                `);

                // Add click handler
                $button.find('.test-data-prefill-btn').on('click', () => {
                    this.prefillForm(viewId);
                });

                // Insert at top of form
                $form.prepend($button);
                console.log(`🎲 Test data prefill button added to ${viewId}`);
            }
        };

        // Event listener setup
        const eventListeners = {
            /**
             * Sets up form submission listeners
             */
            setupFormSubmissionListeners: function () {
                // Listen for form submissions on all configured views
                Object.keys(viewConfigs).forEach(viewId => {

                    // Use before-submit event for async duplicate checking
                    $(document).on(`knack-form-before-submit.${viewId}`, function (event, view) {
                        console.log(`📋 Before form submission for ${viewId} - running validation and duplicate check`);

                        // Check if we should skip validation (already validated via duplicate check)
                        if (window.skipValidationForSubmit) {
                            console.log(`⏭️ Skipping validation for ${viewId} - already validated via duplicate check`);
                            return true; // Allow normal submission
                        }

                        const validation = validator.validateView(viewId);

                        if (!validation.isValid) {
                            // Stop the event immediately
                            event.preventDefault();
                            event.stopImmediatePropagation();

                            utils.showValidationSummary(validation.errors);
                            utils.focusFirstError(viewId);
                            console.log(`❌ Before-submit validation failed for ${viewId} due to ${validation.errors.length} validation errors`);
                            return false;
                        }

                        console.log(`✅ Validation passed for ${viewId} - checking for duplicates`);

                        // Prevent default submission - we'll handle it async
                        event.preventDefault();
                        event.stopImmediatePropagation();

                        // Extract form data for duplicate checking
                        const formData = eventListeners.extractFormData(viewId);

                        // Show loading state
                        const $form = $(`#${viewId} form`);
                        const $submitBtn = $form.find('button[type="submit"]');
                        const originalText = $submitBtn.text();
                        $submitBtn.prop('disabled', true).text('Checking for duplicates...');

                        // Fire the existing webhook which now includes duplicate detection
                        webhookManager.fireWebhookWithDuplicateCheck(viewId, formData, $form, $submitBtn, originalText)
                            .then(response => {
                                // Handle the response from Make.com (includes duplicate detection)
                                duplicateHandler.handleDuplicateResponse(response, formData, viewId, $form, $submitBtn, originalText);
                            })
                            .catch(error => {
                                console.error('Webhook with duplicate check failed:', error);

                                // On failure, show error and re-enable form
                                $submitBtn.prop('disabled', false).text(originalText);
                                duplicateHandler.showError('Unable to process form submission. Please try again.');
                            });

                        return false;
                    }.bind(this));

                    // Also intercept submit button clicks as a last resort
                    $(document).on('click', `#${viewId} .kn-button.is-primary, #${viewId} input[type="submit"]`, function (e) {
                        console.log(`🔘 Submit button clicked for ${viewId}`);

                        const validation = validator.validateView(viewId);

                        if (!validation.isValid) {
                            // Stop the click event
                            e.preventDefault();
                            e.stopImmediatePropagation();

                            utils.showValidationSummary(validation.errors);
                            utils.focusFirstError(viewId);
                            console.log(`❌ Submit button click blocked for ${viewId} due to ${validation.errors.length} validation errors`);
                            return false;
                        }

                        console.log(`✅ Submit button validation passed for ${viewId} - checking for duplicates`);

                        // Prevent the click from proceeding - we'll handle submission async
                        e.preventDefault();
                        e.stopImmediatePropagation();

                        // Extract form data for duplicate checking
                        const formData = eventListeners.extractFormData(viewId);

                        // Show loading state
                        const $form = $(`#${viewId} form`);
                        const $submitBtn = $(e.currentTarget);
                        const originalText = $submitBtn.text();
                        $submitBtn.prop('disabled', true).text('Checking for duplicates...');

                        // Fire the existing webhook which now includes duplicate detection
                        webhookManager.fireWebhookWithDuplicateCheck(viewId, formData, $form, $submitBtn, originalText)
                            .then(response => {
                                // Handle the response from Make.com (includes duplicate detection)
                                duplicateHandler.handleDuplicateResponse(response, formData, viewId, $form, $submitBtn, originalText);
                            })
                            .catch(error => {
                                console.error('Webhook with duplicate check failed:', error);

                                // On failure, show error and re-enable form
                                $submitBtn.prop('disabled', false).text(originalText);
                                duplicateHandler.showError('Unable to process form submission. Please try again.');
                            });

                        return false;
                    });
                });
            },

            /**
             * Sets up field interaction listeners for real-time validation
             */
            setupFieldInteractionListeners: function () {
                Object.keys(viewConfigs).forEach(viewId => {
                    const config = viewConfigs[viewId];
                    if (!config || !config.fields) return;

                    for (const fieldId in config.fields) {
                        const fieldConfig = config.fields[fieldId];
                        if (!fieldConfig.rule) continue;

                        const ruleDefinition = validationRuleTypes[fieldConfig.rule];
                        if (!ruleDefinition) continue;

                        // Determine events and selectors based on rule type
                        let events, selectors;

                        switch (fieldConfig.rule) {
                            case 'checkbox-required':
                                events = 'change';
                                selectors = fieldConfig.selector;
                                break;
                            case 'name-fields':
                                events = 'input blur';
                                selectors = `${fieldConfig.selectors.first}, ${fieldConfig.selectors.last}`;
                                break;
                            case 'mobile-number':
                            case 'landline-number':
                            case 'proper-case-text':
                                events = 'blur';
                                selectors = fieldConfig.selector;
                                break;
                            case 'contact-group':
                                events = 'input blur';
                                selectors = Object.values(fieldConfig.selectors).join(', ');
                                break;
                            default:
                                events = 'blur';
                                selectors = fieldConfig.selector;
                        }

                        $(document).on(events, selectors, function () {
                            fieldTracker.markFieldInteracted(viewId, fieldId);
                            if (fieldTracker.hasFieldBeenInteracted(viewId, fieldId)) {
                                // Get field value
                                const $field = $(fieldConfig.selector);
                                const fieldValue = $field.val() || '';

                                // Run validation
                                const result = ruleDefinition.validate(fieldConfig, fieldValue, $field);

                                if (result.isValid) {
                                    utils.removeFieldError(fieldId);

                                    // Update field with normalized value if provided
                                    if (result.normalizedValue && result.normalizedValue !== fieldValue) {
                                        $field.val(result.normalizedValue);
                                        console.log(`🔄 Field ${fieldId} normalized on interaction: ${result.normalizedValue}`);
                                    }

                                    // Handle special cases for certain rule types
                                    if (fieldConfig.rule === 'landline-number') {
                                        utils.removeConfirmationMessage(fieldId);
                                        if (result.hasAreaCodeCorrection) {
                                            utils.addConfirmationMessage(fieldId, 'Please confirm area code');
                                            console.log(`🟢 Area code confirmation shown for ${fieldId}`);
                                        }
                                    }

                                    console.log(`✅ Real-time validation passed for ${fieldId}`);
                                }
                            }
                        });
                    }
                });
            },

            /**
             * Extracts form data for webhook payload
             */
            extractFormData: function (viewId) {
                const formData = {};
                const config = viewConfigs[viewId];

                if (!config || !config.fields) return formData;

                for (const fieldId in config.fields) {
                    const fieldConfig = config.fields[fieldId];

                    switch (fieldConfig.rule) {
                        case 'checkbox-required':
                            const selectedValues = [];
                            $(fieldConfig.selector + ':checked').each(function () {
                                selectedValues.push($(this).val());
                            });
                            formData[fieldId] = selectedValues;
                            break;

                        case 'name-fields':
                            formData[fieldId] = {
                                first: $(fieldConfig.selectors.first).val().trim(),
                                last: $(fieldConfig.selectors.last).val().trim()
                            };
                            break;

                        case 'mobile-number':
                            formData[fieldId] = $(fieldConfig.selector).val().trim();
                            break;

                        case 'landline-number':
                            formData[fieldId] = $(fieldConfig.selector).val().trim();
                            break;

                        case 'proper-case-text':
                            formData[fieldId] = $(fieldConfig.selector).val().trim();
                            break;

                        case 'contact-group':
                            formData.contact_info = {
                                email: $(fieldConfig.selectors.email).val().trim(),
                                mobile: $(fieldConfig.selectors.mobile).val().trim(),
                                phone: $(fieldConfig.selectors.phone).val().trim()
                            };
                            break;

                        default:
                            formData[fieldId] = $(fieldConfig.selector).val().trim();
                    }
                }

                return formData;
            }
        };

        // Public API
        return {
            /**
             * Initializes the validation and webhook system
             */
            init: function () {
                console.log('🚀 Initializing Form Validation and Webhook Control System');
                eventListeners.setupFormSubmissionListeners();
                eventListeners.setupFieldInteractionListeners();

                // Add test data prefill buttons to configured views
                $(document).on('knack-view-render.any', function (event, view, data) {
                    const viewId = view.key;
                    if (viewConfigs[viewId]) {
                        // Small delay to ensure form is fully rendered
                        setTimeout(() => {
                            testDataGenerator.addPrefillButton(viewId);
                        }, 100);
                    }
                });

                console.log('✅ Form Validation and Webhook Control System initialized');
            },

            /**
             * Adds a new view configuration
             */
            addViewConfig: function (viewId, config) {
                viewConfigs[viewId] = config;
                console.log(`➕ Added configuration for ${viewId}`);
            },

            /**
             * Updates webhook settings for a view
             */
            updateWebhook: function (viewId, webhookUrl, enabled = true) {
                if (viewConfigs[viewId]) {
                    viewConfigs[viewId].webhook.url = webhookUrl;
                    viewConfigs[viewId].webhook.enabled = enabled;
                    console.log(`🔗 Updated webhook for ${viewId}: ${webhookUrl}`);
                }
            },

            /**
             * Manually validates a view
             */
            validateView: function (viewId) {
                return validator.validateView(viewId);
            },

            /**
             * Gets current configuration
             */
            getConfig: function () {
                return viewConfigs;
            }
        };
    })();

    // Initialize the system when document is ready
    $(document).ready(function () {
        // Small delay to ensure Knack is fully loaded
        setTimeout(function () {
            window.FormValidationWebhookSystem.init();

            // Set up Knack error message interceptor
            setupKnackErrorInterceptor();
        }, 1000);
    });

    /**
     * Intercepts and relocates Knack's built-in error messages
     */
    function setupKnackErrorInterceptor() {
        // Watch for Knack's error messages appearing
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType === 1) { // Element node
                        // Look for Knack error messages
                        const $node = $(node);

                        // Check if this is a Knack error alert
                        if ($node.hasClass('kn-alert') || $node.find('.kn-alert').length) {
                            const $alert = $node.hasClass('kn-alert') ? $node : $node.find('.kn-alert');
                            const errorText = $alert.text().trim();

                            // Check if this is an email validation error
                            if (errorText.includes('must be a valid email') || errorText.includes('email')) {
                                console.log('📧 Intercepted Knack email error:', errorText);

                                // Hide the original error
                                $alert.hide();

                                // Show error below the email field instead
                                const $emailField = $('#kn-input-field_3959');
                                if ($emailField.length) {
                                    $emailField.addClass('kn-error');

                                    // Create error message with native Knack styling
                                    let $errorDiv = $emailField.find('.validation-error-message');
                                    if ($errorDiv.length === 0) {
                                        $errorDiv = $('<div class="kn-message is-error validation-error-message" style="margin-top: 5px;"><span class="kn-message-body"></span></div>');
                                        $emailField.append($errorDiv);
                                    }
                                    $errorDiv.find('.kn-message-body').text(errorText);
                                    $errorDiv.show();
                                }
                            }
                        }
                    }
                });
            });
        });

        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('👀 Knack error interceptor initialized');
    }

    // ========================================================================
    // END FORM VALIDATION AND WEBHOOK CONTROL SYSTEM
    // ========================================================================

}; // This closes the ktlReady function