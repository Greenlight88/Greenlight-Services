window.APP_VERSION = '1.0.0';

window.ktlReady = function (appInfo = {}) {
    var ktl = new Ktl($, appInfo);


    // Smart CSS loading with better dev mode handling
    function loadCSS() {
        const localCSS = 'http://localhost:3000/KnackApps/GreenlightOnline/GreenlightOnline.css';
        const productionCSS = 'https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Online@master/KnackApps/GreenlightOnline/GreenlightOnline.css';

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.crossOrigin = 'anonymous';

        // Check if actually developing locally
        const isDevMode = localStorage.getItem('Greenl_56ea_dev');
        const loadProduction = () => {
            link.href = productionCSS;
            console.log('CSS loading from jsDelivr CDN');
        };

        if (isDevMode) {
            // Test if localhost is actually available
            fetch(localCSS, { method: 'HEAD', mode: 'cors' })
                .then(() => {
                    // Localhost is available and CORS is working
                    link.href = localCSS;
                    console.log('CSS loading from localhost (dev mode)');
                    document.head.appendChild(link);

                    // Still add fallback
                    link.onerror = () => {
                        console.log('Local CSS failed, falling back to jsDelivr...');
                        link.href = productionCSS;
                    };
                })
                .catch(() => {
                    // Localhost not available or CORS failing
                    console.log('Localhost not available, loading from jsDelivr...');
                    loadProduction();
                    document.head.appendChild(link);
                });
        } else {
            loadProduction();
            document.head.appendChild(link);
        }

        // Success handling
        link.onload = function () {
            console.log('✅ CSS successfully loaded');
        };
    }

    loadCSS();

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

}; // This closes the ktlReady function