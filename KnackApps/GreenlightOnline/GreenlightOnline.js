window.APP_VERSION = '1.0.14'; // Add auto-refresh with timestamp pulse for view_3503

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
            autoRefresh: true,
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
            devPauseAutoRefresh: false,
            virtualKeyboard: false,
            iFrameWnd: false,

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

        // Auto-refresh configuration for tables
        autoRefresh: [
            {
                viewId: 'view_4829',      // Enquiries table
                sceneId: 'scene_1973',    // Scene where the view is rendered
                interval: 60000,          // Refresh every 60 seconds (60000ms) - KTL minimum
                onlyIfVisible: true,      // Only refresh when view is visible
                preserveScrollPos: true,  // Maintain scroll position after refresh
            },
            {
                viewId: 'view_3503',      // Table on scene_1415
                sceneId: 'scene_1415',    // Scene where the view is rendered
                interval: 60000,          // Refresh every 60 seconds (60000ms) - KTL minimum
                onlyIfVisible: true,      // Only refresh when view is visible
                preserveScrollPos: true,  // Maintain scroll position after refresh
            }
        ],

        headerAlignment: true,
        ktlFlashRate: '1',
        ktlOutlineColor: '#39b54a',
        ktlHideShowButtonColor: '#222222',
        stickGroupingsWithHeader: true,
        hscCollapsedColumnsWidth: '5',
        hscGlobal: false,
    });

    console.log('🔄 Custom auto-refresh configured for view_4829 and view_3503');

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
            'view_4800', 'view_4803', 'view_4804', 'view_4829', 'view_4860', 'view_4870', 'view_4887',
            'view_5427', 'view_5433', 'view_5649', 'view_5652', 'view_5655', 'view_5664', 'view_5667'];

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
            // Smart name formatting with support for prefixes, hyphens, Mc/Mac/O'/d'
            'name-fields': {
                // Surname prefixes that stay lowercase when followed by another word
                // Note: 'van' is handled separately (Dutch - always capitalised)
                // Note: 'de' is handled separately (preserve user input for Dutch vs other languages)
                lowercasePrefixes: ['von', 'di', 'la', 'le', 'del', 'della', 'dos', 'das', 'du'],

                // Dutch 'van' variations - always capitalised
                dutchVanPrefixes: ['van', 'van de', 'van den', 'van der'],

                // Check if text has mixed case (user intentionally cased it)
                hasMixedCase: function (text) {
                    if (!text) return false;
                    const hasUpper = /[A-Z]/.test(text);
                    const hasLower = /[a-z]/.test(text);
                    return hasUpper && hasLower;
                },

                // Format a single name part (handles hyphens, Mc, Mac, O', d', Fitz)
                formatNamePart: function (name) {
                    if (!name) return '';

                    // Handle hyphenated names - format each part
                    if (name.includes('-')) {
                        return name.split('-').map(part => this.formatNamePart(part)).join('-');
                    }

                    const lowerName = name.toLowerCase();

                    // Handle d' prefix (d'Arcy, d'Angelo)
                    if (lowerName.startsWith("d'") && lowerName.length > 2) {
                        return "d'" + lowerName.charAt(2).toUpperCase() + lowerName.slice(3);
                    }

                    // Handle O' prefix (O'Brien, O'Connor)
                    if (lowerName.startsWith("o'") && lowerName.length > 2) {
                        return "O'" + lowerName.charAt(2).toUpperCase() + lowerName.slice(3);
                    }

                    // Handle Mc prefix (McDonald, McGregor)
                    if (lowerName.startsWith('mc') && lowerName.length > 2 && /[a-z]/.test(lowerName.charAt(2))) {
                        return 'Mc' + lowerName.charAt(2).toUpperCase() + lowerName.slice(3);
                    }

                    // Handle Mac prefix (MacDonald) - followed by consonant (not e,h,i,k to avoid Mace, Mach, etc.)
                    if (lowerName.startsWith('mac') && lowerName.length > 3) {
                        const charAfterMac = lowerName.charAt(3);
                        if (/[bcdfgjlmnpqrstvwxyz]/.test(charAfterMac)) {
                            return 'Mac' + lowerName.charAt(3).toUpperCase() + lowerName.slice(4);
                        }
                    }

                    // Handle Fitz prefix (FitzGerald, FitzPatrick)
                    if (lowerName.startsWith('fitz') && lowerName.length > 4) {
                        return 'Fitz' + lowerName.charAt(4).toUpperCase() + lowerName.slice(5);
                    }

                    // Default: simple proper case
                    return lowerName.charAt(0).toUpperCase() + lowerName.slice(1);
                },

                // Format first name - always proper case (with special pattern handling)
                // Handles multi-word first names like "Mary Jane", "Jean Pierre"
                formatFirstName: function (firstName) {
                    if (!firstName) return '';
                    const trimmed = firstName.trim();

                    // If user has mixed case, preserve it
                    if (this.hasMixedCase(trimmed)) {
                        console.log(`📝 First name has mixed case - preserving: "${trimmed}"`);
                        return trimmed;
                    }

                    // Handle multi-word first names - proper case each word
                    if (trimmed.includes(' ')) {
                        return trimmed.split(/\s+/).map(part => this.formatNamePart(part)).join(' ');
                    }

                    return this.formatNamePart(trimmed);
                },

                // Format last name - handles prefixes, hyphens, special patterns
                formatLastName: function (lastName) {
                    if (!lastName) return '';
                    const trimmed = lastName.trim();

                    // If user has mixed case, preserve entire surname as-is
                    if (this.hasMixedCase(trimmed)) {
                        console.log(`📝 Last name has mixed case - preserving: "${trimmed}"`);
                        return trimmed;
                    }

                    // Single word surname - use formatNamePart
                    if (!trimmed.includes(' ')) {
                        return this.formatNamePart(trimmed);
                    }

                    // Multi-word surname - check for prefixes
                    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
                    const result = [];

                    for (let i = 0; i < words.length; i++) {
                        const word = words[i].toLowerCase();
                        const isLastWord = (i === words.length - 1);

                        if (isLastWord) {
                            // Last word always gets proper case formatting
                            result.push(this.formatNamePart(words[i]));
                        } else if (word === 'van') {
                            // Dutch 'van' - always capitalised
                            result.push('Van');
                        } else if (word === 'de') {
                            // 'de' - preserve original case if capitalised, otherwise lowercase
                            // Since we already checked hasMixedCase above, here it's all lower/upper
                            // Default to lowercase (more common internationally)
                            result.push('de');
                        } else if (word === 'den' || word === 'der') {
                            // Part of Dutch 'van den'/'van der' - lowercase as secondary particle
                            result.push(word);
                        } else if (this.lowercasePrefixes.includes(word)) {
                            // Other known lowercase prefixes
                            result.push(word);
                        } else {
                            // Unknown word in middle - proper case it
                            result.push(this.formatNamePart(words[i]));
                        }
                    }

                    return result.join(' ');
                },

                validate: function (config, fieldValue, $field) {
                    const firstName = $(config.selectors.first).val().trim();
                    const lastName = $(config.selectors.last).val().trim();

                    // Format names using smart formatting
                    const formattedFirstName = this.formatFirstName(firstName);
                    const formattedLastName = this.formatLastName(lastName);

                    // Update the fields if they were changed
                    if (firstName && firstName !== formattedFirstName) {
                        $(config.selectors.first).val(formattedFirstName);
                        console.log(`📝 First name formatted: '${firstName}' → '${formattedFirstName}'`);
                    }
                    if (lastName && lastName !== formattedLastName) {
                        $(config.selectors.last).val(formattedLastName);
                        console.log(`📝 Last name formatted: '${lastName}' → '${formattedLastName}'`);
                    }

                    return {
                        isValid: formattedFirstName.length > 0 && formattedLastName.length > 0,
                        normalizedValue: { first: formattedFirstName, last: formattedLastName }
                    };
                },
                defaultMessage: 'Both First and Last names are required',
                displayError: function (fieldId, message, utils, fieldConfig, viewId) {
                    // Name fields are composite (first/last), so we need to find the container
                    // and manually create the notification with unified styling
                    const $firstInput = $(fieldConfig.selectors.first);
                    const $lastInput = $(fieldConfig.selectors.last);
                    const $nameContainer = $firstInput.closest('.kn-input');

                    if (!$nameContainer.length) {
                        console.warn(`⚠️ Could not find container for name field ${fieldId}`);
                        return;
                    }

                    // Remove any existing notification
                    $nameContainer.find('.field-notification-message').remove();

                    // Use same styling as unified notification system
                    const $notification = $(`<div class="field-notification-message field-error-message" style="
                        color: #d32f2f;
                        font-size: 13px;
                        margin-top: 5px;
                        padding: 8px 12px;
                        background: #ffebee;
                        border-left: 3px solid #d32f2f;
                        border-radius: 3px;
                        line-height: 1.5;
                    ">
                        <div style="display: flex; align-items: flex-start; gap: 8px;">
                            <span style="flex-shrink: 0; font-size: 14px;">❌</span>
                            <div style="flex: 1;">${message}</div>
                        </div>
                    </div>`);

                    $nameContainer.append($notification);
                    console.log(`❌ Name field error shown: ${message}`);

                    // Focus on the appropriate field - first name if missing, otherwise last name
                    const firstName = $firstInput.val().trim();
                    const lastName = $lastInput.val().trim();

                    if (!firstName) {
                        $firstInput.focus();
                    } else if (!lastName) {
                        $lastInput.focus();
                    } else {
                        $firstInput.focus(); // Default to first
                    }
                },
                clearError: function (fieldId, utils, fieldConfig, viewId) {
                    const $firstInput = $(fieldConfig.selectors.first);
                    const $nameContainer = $firstInput.closest('.kn-input');
                    $nameContainer.find('.field-notification-message').remove();
                }
            },

            // Mobile number validation
            'mobile-number': {
                validate: function (config, fieldValue, $field) {
                    const rawValue = fieldValue || '';
                    const trimmedValue = rawValue.trim();

                    if (!trimmedValue) {
                        // If field had whitespace-only content, clear it
                        if (rawValue !== '') {
                            $(config.selector).val('');
                        }
                        return { isValid: true, normalizedValue: '' };
                    }

                    const result = validator.normalizeMobileNumber(trimmedValue);

                    // If validation failed, return the specific error message
                    if (!result.isValid) {
                        return {
                            isValid: false,
                            normalizedValue: '',
                            errorMessage: result.error || 'Please enter a valid mobile number'
                        };
                    }

                    // Apply normalized value to field (includes trimming whitespace)
                    if (result.normalizedValue && result.normalizedValue !== rawValue) {
                        $(config.selector).val(result.normalizedValue);
                        console.log(`📝 Mobile field updated: '${rawValue}' → '${result.normalizedValue}'`);
                    }

                    return result;
                },
                defaultMessage: 'Please enter a valid mobile number'
            },

            // Landline number validation with extensions
            'landline-number': {
                validate: function (config, fieldValue, $field) {
                    const rawValue = fieldValue || '';
                    const trimmedValue = rawValue.trim();

                    if (!trimmedValue) {
                        // If field had whitespace-only content, clear it
                        if (rawValue !== '') {
                            $(config.selector).val('');
                        }
                        return { isValid: true, normalizedValue: '', hasAreaCodeCorrection: false };
                    }

                    const result = validator.normalizeLandlineNumber(trimmedValue);

                    // If validation failed, return the specific error message
                    if (!result.isValid) {
                        return {
                            isValid: false,
                            normalizedValue: '',
                            hasAreaCodeCorrection: false,
                            errorMessage: result.error || 'Please enter a valid phone number'
                        };
                    }

                    // Apply normalized value to field (includes trimming whitespace)
                    if (result.normalizedValue && result.normalizedValue !== rawValue) {
                        $(config.selector).val(result.normalizedValue);
                        console.log(`📝 Landline field updated: '${rawValue}' → '${result.normalizedValue}'`);
                    }

                    return result;
                },
                defaultMessage: 'Please enter a valid phone number'
            },

            // Contact group validation (at least one contact method)
            'contact-group': {
                validate: function (config, fieldValue, $field) {
                    const email = $(config.selectors.email).val().trim();
                    const mobile = $(config.selectors.mobile).val().trim();
                    const phone = $(config.selectors.phone).val().trim();

                    // Check if at least one contact method is provided
                    const hasAtLeastOne = email.length > 0 || mobile.length > 0 || phone.length > 0;

                    if (!hasAtLeastOne) {
                        return {
                            isValid: false,
                            normalizedValue: { email, mobile, phone },
                            errorMessage: 'Please provide at least one contact method (Email, Mobile, or Phone)'
                        };
                    }

                    // If email is provided, validate its format
                    if (email.length > 0) {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if (!emailPattern.test(email)) {
                            return {
                                isValid: false,
                                normalizedValue: { email, mobile, phone },
                                errorMessage: 'Please enter a valid email address (e.g., name@company.com.au)'
                            };
                        }

                        // Normalize email: keep local part casing, lowercase domain
                        const atIndex = email.indexOf('@');
                        const localPart = email.substring(0, atIndex);
                        const domain = email.substring(atIndex + 1).toLowerCase();
                        const normalizedEmail = localPart + '@' + domain;

                        // Apply normalized email back to field if changed
                        if (normalizedEmail !== email) {
                            $(config.selectors.email).val(normalizedEmail);
                        }

                        return {
                            isValid: true,
                            normalizedValue: { email: normalizedEmail, mobile, phone }
                        };
                    }

                    return {
                        isValid: true,
                        normalizedValue: { email, mobile, phone }
                    };
                },
                defaultMessage: 'Please provide at least one contact method (Email, Mobile, or Phone)',
                displayError: function (fieldId, message, utils, fieldConfig, viewId) {
                    // Get email field ID from selector (e.g., '#field_4164' -> 'field_4164')
                    const emailSelector = fieldConfig.selectors.email;
                    const emailFieldId = emailSelector.replace('#', '');
                    // Use unified notification system for consistent styling
                    utils.addFieldError(emailFieldId, message, null, viewId);
                    // Focus on email field
                    $(emailSelector).focus();
                },
                clearError: function (fieldId, utils, fieldConfig, viewId) {
                    // Get email field ID from selector
                    const emailSelector = fieldConfig.selectors.email;
                    const emailFieldId = emailSelector.replace('#', '');
                    utils.removeFieldError(emailFieldId, null, viewId);
                }
            },

            // Proper case text validation (auto-converts to Title Case)
            'proper-case-text': {
                validate: function (config, fieldValue, $field) {
                    const rawValue = fieldValue || '';
                    const trimmedValue = rawValue.trim();

                    if (!trimmedValue) {
                        // If field had whitespace-only content, clear it
                        if (rawValue !== '') {
                            $field.val('');
                        }
                        return { isValid: true, normalizedValue: '' };
                    }

                    // Convert to proper case (Title Case)
                    function toProperCase(text) {
                        return text.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
                    }

                    const properCaseValue = toProperCase(trimmedValue);

                    // Update the field if it was changed (includes trimming whitespace)
                    if (properCaseValue !== rawValue) {
                        $field.val(properCaseValue);
                        console.log(`📝 Text corrected to Proper Case: '${rawValue}' → '${properCaseValue}'`);
                    }

                    return {
                        isValid: true,
                        normalizedValue: properCaseValue
                    };
                },
                defaultMessage: 'Text will be automatically formatted to Proper Case'
            },

            // Short name validation (optional field, no specific rules)
            'short-name': {
                validate: function (config, fieldValue, $field) {
                    const rawValue = fieldValue || '';
                    const trimmedValue = rawValue.trim();

                    // Update field if whitespace was trimmed
                    if (trimmedValue !== rawValue) {
                        $field.val(trimmedValue);
                        console.log(`📝 Short name field updated: '${rawValue}' → '${trimmedValue}'`);
                    }

                    return { isValid: true, normalizedValue: trimmedValue };
                },
                defaultMessage: ''
            },

            // Entity type validation (required dropdown)
            'entity-type': {
                validate: function (config, fieldValue, $field) {
                    const value = $(config.selector).val();
                    return {
                        isValid: value && value !== '',
                        normalizedValue: value
                    };
                },
                defaultMessage: 'Please select an entity type'
            },

            // Melbourne address validation with normalization
            'melbourne-address': {
                validate: function (config, fieldValue, $field) {
                    // Address fields are optional, but we normalize them if provided
                    const streetRaw = $(config.selectors.street).val() || '';
                    const street2Raw = $(config.selectors.street2).val() || '';
                    const cityRaw = $(config.selectors.city).val() || '';
                    const stateRaw = $(config.selectors.state).val() || '';
                    const zipRaw = $(config.selectors.zip).val() || '';

                    // Normalize each field
                    const normalizedStreet = this.normalizeStreetAddress(streetRaw);
                    const normalizedStreet2 = this.normalizeStreetAddress(street2Raw);
                    const normalizedCity = this.normalizeSuburb(cityRaw);
                    const normalizedState = this.normalizeState(stateRaw);
                    const normalizedZip = zipRaw.trim();

                    // Apply normalized values back to fields
                    if (streetRaw && normalizedStreet !== streetRaw) {
                        $(config.selectors.street).val(normalizedStreet);
                    }
                    if (street2Raw && normalizedStreet2 !== street2Raw) {
                        $(config.selectors.street2).val(normalizedStreet2);
                    }
                    if (cityRaw && normalizedCity !== cityRaw) {
                        $(config.selectors.city).val(normalizedCity);
                    }
                    if (stateRaw && normalizedState !== stateRaw) {
                        $(config.selectors.state).val(normalizedState);
                    }

                    return {
                        isValid: true,
                        normalizedValue: {
                            street: normalizedStreet,
                            street2: normalizedStreet2,
                            city: normalizedCity,
                            state: normalizedState,
                            zip: normalizedZip
                        }
                    };
                },

                /**
                 * Normalize street address
                 * - Unit numbers: "Unit 3" / "U3" / "3" -> "3/"
                 * - Street types: "Street" -> "St", "Avenue" -> "Ave"
                 * - Proper case with hyphenation support
                 * - PO Box variants
                 */
                normalizeStreetAddress: function (address) {
                    if (!address || address.trim() === '') return '';

                    let normalized = address.trim();

                    // Handle PO Box variants first
                    // P.O. Box, P/O Box, Post Office Box -> PO Box
                    normalized = normalized.replace(/\b(P\.?\s?O\.?\s?Box|Post\s+Office\s+Box)\b/gi, 'PO Box');

                    // Handle unit number variations
                    // "Unit 3, 16 Rice Avenue" -> "3/16 Rice Avenue"
                    // "U3 16 Rice Avenue" -> "3/16 Rice Avenue"
                    // "3 16 Rice Avenue" -> "3/16 Rice Avenue"

                    // Pattern: "Unit 3," or "U3," or "Unit 3 " followed by street number
                    normalized = normalized.replace(/^(?:Unit\s+|U)(\d+),?\s+(\d+)/i, '$1/$2');

                    // Pattern: Just number at start followed by another number (e.g., "3 16")
                    // Be careful - only if it looks like "single-digit(s) space digits"
                    normalized = normalized.replace(/^(\d{1,4})\s+(\d+\s+\w)/i, '$1/$2');

                    // Normalize street types to abbreviations
                    const streetTypes = {
                        'Street': 'St',
                        'Avenue': 'Ave',
                        'Road': 'Rd',
                        'Drive': 'Dr',
                        'Court': 'Ct',
                        'Place': 'Pl',
                        'Crescent': 'Cres',
                        'Boulevard': 'Blvd',
                        'Highway': 'Hwy',
                        'Lane': 'Ln',
                        'Terrace': 'Tce',
                        'Parade': 'Pde',
                        'Grove': 'Gve',
                        'Close': 'Cl',
                        'Circuit': 'Cct',
                        'Way': 'Way',
                        'Square': 'Sq',
                        'Esplanade': 'Esp'
                    };

                    // Replace street types (case insensitive, word boundary)
                    for (const [full, abbrev] of Object.entries(streetTypes)) {
                        const regex = new RegExp('\\b' + full + '\\b', 'gi');
                        normalized = normalized.replace(regex, abbrev);
                    }

                    // Apply proper case with hyphenation support
                    // Split by spaces, capitalize first letter of each word
                    normalized = normalized.replace(/\b\w+/g, function (word) {
                        // Handle hyphenated words (e.g., Marcus-Dreyfus)
                        if (word.includes('-')) {
                            return word.split('-').map(part =>
                                part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
                            ).join('-');
                        }
                        // Handle PO Box specially (keep uppercase)
                        if (word.toUpperCase() === 'PO' || word.toUpperCase() === 'BOX') {
                            return word.toUpperCase();
                        }
                        // Regular word: Proper Case
                        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                    });

                    return normalized;
                },

                /**
                 * Normalize suburb name
                 * - Convert to ALL CAPS
                 */
                normalizeSuburb: function (suburb) {
                    if (!suburb || suburb.trim() === '') return '';
                    return suburb.trim().toUpperCase();
                },

                /**
                 * Normalize state
                 * - Convert to uppercase abbreviation
                 */
                normalizeState: function (state) {
                    if (!state || state.trim() === '') return '';

                    const stateMap = {
                        'victoria': 'VIC',
                        'vic': 'VIC',
                        'new south wales': 'NSW',
                        'nsw': 'NSW',
                        'queensland': 'QLD',
                        'qld': 'QLD',
                        'south australia': 'SA',
                        'sa': 'SA',
                        'western australia': 'WA',
                        'wa': 'WA',
                        'tasmania': 'TAS',
                        'tas': 'TAS',
                        'northern territory': 'NT',
                        'nt': 'NT',
                        'australian capital territory': 'ACT',
                        'act': 'ACT'
                    };

                    const normalized = state.trim().toLowerCase();
                    return stateMap[normalized] || state.trim().toUpperCase();
                },

                defaultMessage: ''
            },

            // Company email validation (optional, but must be valid if provided)
            'company-email': {
                validate: function (config, fieldValue, $field) {
                    const rawValue = $(config.selector).val() || '';
                    const value = rawValue.trim();

                    // Log detailed validation info including character codes
                    console.log(`📧 Validating email - Raw: '${rawValue}', Trimmed: '${value}', Length: ${value.length}, Selector: ${config.selector}`);
                    if (value.length > 0) {
                        console.log(`   Character codes: ${Array.from(value).map(c => c.charCodeAt(0)).join(',')}`);
                    }

                    if (!value) {
                        return { isValid: true, normalizedValue: '' };
                    }

                    // Simplified email validation - basic format checking
                    // Full validation will be done by webhook (pre/post submission)

                    // Basic pattern: localpart@domain.tld or localpart@domain.tld.tld
                    // Local part: allows letters, numbers, and common special chars
                    // Domain: letters, numbers, hyphens, and dots
                    // TLD: at least 2 letters
                    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

                    if (!emailPattern.test(value)) {
                        console.log(`❌ Email validation FAILED (invalid format) for: '${value}'`);
                        return {
                            isValid: false,
                            normalizedValue: value,
                            errorMessage: 'Please enter a valid email address (e.g., name@company.com)'
                        };
                    }

                    // Check for @ symbol
                    const atIndex = value.indexOf('@');
                    if (atIndex === -1) {
                        console.log(`❌ Email validation FAILED (no @ symbol) for: '${value}'`);
                        return {
                            isValid: false,
                            normalizedValue: value,
                            errorMessage: 'Email must contain @ symbol (e.g., name@company.com)'
                        };
                    }

                    // Get domain part (everything after @)
                    const domain = value.substring(atIndex + 1);

                    // Check domain has at least one dot
                    if (!domain.includes('.')) {
                        console.log(`❌ Email validation FAILED (no domain extension) for: '${value}'`);
                        return {
                            isValid: false,
                            normalizedValue: value,
                            errorMessage: 'Email must include a domain extension (e.g., name@company.com)'
                        };
                    }

                    // Get the last part after the final dot (the TLD)
                    const lastDotIndex = domain.lastIndexOf('.');
                    const tld = domain.substring(lastDotIndex + 1);

                    // TLD must be at least 2 characters (e.g., .au, .uk, .com)
                    if (tld.length < 2) {
                        console.log(`❌ Email validation FAILED (TLD too short: '${tld}') for: '${value}'`);
                        return {
                            isValid: false,
                            normalizedValue: value,
                            errorMessage: 'Domain extension must be at least 2 characters (e.g., .com, .au)'
                        };
                    }

                    // Check TLD contains only letters (no numbers or special chars in TLD)
                    if (!/^[a-zA-Z]+$/.test(tld)) {
                        console.log(`❌ Email validation FAILED (TLD contains invalid characters: '${tld}') for: '${value}'`);
                        return {
                            isValid: false,
                            normalizedValue: value,
                            errorMessage: 'Domain extension must contain only letters (e.g., .com not .c0m)'
                        };
                    }

                    console.log(`✅ Email validation PASSED for: '${value}'`);

                    // Split email into local part (before @) and domain (after @)
                    const localPart = value.substring(0, atIndex); // Keep original casing
                    const domainLower = domain.toLowerCase(); // Force lowercase

                    const normalizedEmail = localPart + '@' + domainLower;

                    // Apply normalized value to field if it changed (includes trimming whitespace)
                    if (normalizedEmail !== rawValue) {
                        $(config.selector).val(normalizedEmail);
                        console.log(`📝 Email field updated: '${rawValue}' → '${normalizedEmail}'`);
                    }

                    return {
                        isValid: true,
                        normalizedValue: normalizedEmail
                    };
                },
                defaultMessage: 'Please enter a valid email address'
            },

            // Company phone validation (optional)
            'company-phone': {
                validate: function (config, fieldValue, $field) {
                    const rawValue = fieldValue || '';
                    const trimmedValue = rawValue.trim();

                    if (!trimmedValue) {
                        // If field had whitespace-only content, clear it
                        if (rawValue !== '') {
                            $(config.selector).val('');
                        }
                        return { isValid: true, normalizedValue: '' };
                    }

                    const result = validator.normalizeLandlineNumber(trimmedValue);

                    // If validation failed, return the specific error message
                    if (!result.isValid) {
                        return {
                            isValid: false,
                            normalizedValue: '',
                            hasAreaCodeCorrection: false,
                            errorMessage: result.error || 'Please enter a valid phone number'
                        };
                    }

                    // Apply normalized value to field (includes trimming whitespace)
                    if (result.normalizedValue && result.normalizedValue !== rawValue) {
                        $(config.selector).val(result.normalizedValue);
                        console.log(`📝 Phone field updated: '${rawValue}' → '${result.normalizedValue}'`);
                    }

                    return result;
                },
                defaultMessage: 'Please enter a valid phone number'
            },

            // Company name validation (allows any casing, normalizes Pty Ltd variants)
            'company-name': {
                validate: function (config, fieldValue, $field) {
                    const rawValue = fieldValue || '';
                    const trimmedValue = rawValue.trim();

                    if (!trimmedValue) {
                        return { isValid: false, normalizedValue: '', hasWarning: false };
                    }

                    // Normalize Pty Ltd and Ltd variants
                    let normalized = trimmedValue
                        // Normalize "P/L" to "Pty Ltd"
                        .replace(/\bP\/L\b/gi, 'Pty Ltd')
                        // Normalize "pty. ltd." to "Pty Ltd"
                        .replace(/\bpty\.\s*ltd\.?\b/gi, 'Pty Ltd')
                        // Normalize "pty ltd" to "Pty Ltd"
                        .replace(/\bpty\s+ltd\b/gi, 'Pty Ltd')
                        // Normalize standalone "limited" to "Ltd"
                        .replace(/\blimited\b/gi, 'Ltd')
                        // Normalize standalone "ltd." to "Ltd"
                        .replace(/\bltd\.\b/gi, 'Ltd')
                        // Clean up any double spaces
                        .replace(/\s+/g, ' ')
                        .trim();

                    // Detect unusual casing patterns
                    let hasWarning = false;
                    let warningMessage = '';

                    // Check if entirely lowercase
                    if (normalized === normalized.toLowerCase()) {
                        hasWarning = true;
                        warningMessage = 'Company name is all lowercase - this is unusual but allowed';
                    }
                    // Check if entirely uppercase (except for Pty Ltd)
                    else if (normalized.replace(/\bPty Ltd\b/g, '').replace(/\bLtd\b/g, '').trim() === normalized.replace(/\bPty Ltd\b/g, '').replace(/\bLtd\b/g, '').trim().toUpperCase()) {
                        hasWarning = true;
                        warningMessage = 'Company name is all uppercase - this is unusual but allowed';
                    }
                    // Check if mixed case in unusual way (e.g., "aBc")
                    else {
                        const words = normalized.split(/\s+/);
                        for (const word of words) {
                            if (word.length > 1 && word !== 'Pty' && word !== 'Ltd') {
                                const firstChar = word.charAt(0);
                                const rest = word.slice(1);
                                // If first char is lowercase and rest has uppercase, it's unusual
                                if (firstChar === firstChar.toLowerCase() && rest !== rest.toLowerCase()) {
                                    hasWarning = true;
                                    warningMessage = 'Unusual capitalization detected - please verify company name';
                                    break;
                                }
                            }
                        }
                    }

                    // Update field if normalization changed the value (includes trimming whitespace)
                    const changed = normalized !== rawValue;
                    if (changed) {
                        $field.val(normalized);
                        console.log(`📝 Company name normalized: '${rawValue}' → '${normalized}'`);
                    }

                    return {
                        isValid: true,
                        normalizedValue: normalized,
                        hasWarning: hasWarning,
                        warningMessage: warningMessage,
                        changed: changed
                    };
                },
                defaultMessage: 'Please enter a company name',
                displayWarning: function (fieldId, message, utils) {
                    const $container = $('input[name="' + fieldId + '"]').closest('.kn-input');
                    let $warningDiv = $container.find('.validation-warning-message');

                    if ($warningDiv.length === 0) {
                        $warningDiv = $('<div class="kn-message validation-warning-message" style="margin-top: 5px; background-color: #39b54a; color: white; padding: 10px; border-radius: 4px;"><span class="kn-message-body"></span></div>');
                        $container.append($warningDiv);
                    }

                    $warningDiv.find('.kn-message-body').text('ℹ️ ' + message);
                    $warningDiv.show();
                },
                clearWarning: function (fieldId, utils) {
                    const $container = $('input[name="' + fieldId + '"]').closest('.kn-input');
                    $container.find('.validation-warning-message').remove();
                }
            }
        };

        // ========================================================================
        // VIEW CONFIGURATIONS
        // Define which validation rules apply to which fields in each view
        // ========================================================================
        const viewConfigs = {
            // ===== COMPANY CREATION FORM =====
            view_4059: {
                formType: 'company-creation',
                allow_shared_contacts: false,  // Company creation does NOT allow shared contacts (hard fail)
                webhook: {
                    url: 'https://greenlight-services-3.vercel.app/api/company/validate',
                    enabled: true
                },
                postSubmissionWebhook: {
                    url: 'https://greenlight-services-3.vercel.app/api/company/proceed',
                    enabled: true
                },
                fields: {
                    field_992: {
                        rule: 'company-name',
                        selector: '#field_992',
                        required: true
                    },
                    field_3783: {
                        rule: 'short-name',
                        selector: '#field_3783',
                        required: false
                    },
                    field_3845: {
                        rule: 'entity-type',
                        selector: '#view_4059-field_3845',
                        required: true
                    },
                    address: {
                        rule: 'melbourne-address',
                        selectors: {
                            street: '#street',
                            street2: '#street2',
                            city: '#city',
                            state: '#state',
                            zip: '#zip'
                        },
                        required: false
                    },
                    field_4164: {
                        rule: 'company-email',
                        selector: '#field_4164',
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
            view_5605: {
                formType: 'company-update',
                allowSharedContacts: true,  // Update forms allow shared contacts (confirm scenario)
                webhook: {
                    url: 'https://hook.us1.make.com/e9oq91sfh4mpdzaxrfr0khlf7ftqn8sj',
                    enabled: true
                },
                postSubmissionWebhook: {
                    url: 'https://hook.us1.make.com/m7gcd3gof5fihmsel37nlxhjnu8mlvp7',
                    enabled: true
                },
                // Hidden views containing existing record IDs and original values
                // Note: Selectors point to two different views (view_5609 for company, view_5608 for ECN)
                hiddenView: {
                    // Record IDs from ECN view (view_5608)
                    recordIds: {
                        company_record_id: '#view_5608 .field_4135 .kn-detail-body',
                        primary_email_record_id: '#view_5608 .field_4136 .kn-detail-body',
                        primary_phone_record_id: '#view_5608 .field_4137 .kn-detail-body',
                        primary_scn_record_id: '#view_5608 .field_4146 .kn-detail-body'
                    },
                    // Original values from Company Details view (view_5609) and ECN view (view_5608)
                    originalValues: {
                        company_name: '#view_5609 .field_992 .kn-detail-body',
                        company_short_name: '#view_5609 .field_3783 .kn-detail-body',
                        street_address: '#view_5609 .field_969 .kn-detail-body',
                        email: '#view_5608 .field_4066 .kn-detail-body',  // primary_email_normalised
                        phone: '#view_5608 .field_4065 .kn-detail-body'   // primary_phone_normalised
                    }
                },
                // Form input fields
                fields: {
                    field_992: {
                        rule: 'company-name',
                        selector: '#field_992',
                        required: true
                    },
                    field_3783: {
                        rule: 'short-name',
                        selector: '#field_3783',
                        required: false
                    },
                    address: {
                        rule: 'melbourne-address',
                        selectors: {
                            street: '#street',
                            street2: '#street2',
                            city: '#city',
                            state: '#state',
                            zip: '#zip'
                        },
                        required: false
                    },
                    field_4164: {
                        rule: 'company-email',
                        selector: '#field_4164',
                        required: false
                    },
                    field_4056: {
                        rule: 'company-phone',
                        selector: '#field_4056',
                        required: false
                    }
                }
            },

            // ===== CONTACT CREATION FORM =====
            view_5612: {
                formType: 'contact-creation',
                allowSharedContacts: true,  // Contact creation allows shared contacts (confirm scenario)
                webhook: {
                    url: 'https://hook.us1.make.com/nwacilwm8c5sg3w5w2xd7qxwwp250fbu',
                    enabled: true
                },
                postSubmissionWebhook: {
                    url: 'https://hook.us1.make.com/ov8njud5b8cwbuwaf39shqxx2jijmysl',
                    enabled: true
                },
                fields: {
                    field_3860: {
                        rule: 'name-fields',
                        selectors: {
                            first: 'input[name="first"]',
                            last: 'input[name="last"]'
                        },
                        required: true
                    },
                    field_3861: {
                        rule: 'proper-case-text',
                        selector: '#field_3861',
                        required: false
                    },
                    field_4164: {
                        rule: 'company-email',  // Re-using company-email rule for consistency
                        selector: '#field_4164',
                        required: false,
                        conflictType: 'email'
                    },
                    field_4165: {
                        rule: 'mobile-number',
                        selector: '#field_4165',
                        required: false,
                        conflictType: 'mobile'
                    },
                    field_4056: {
                        rule: 'landline-number',  // Re-using landline-number rule
                        selector: '#field_4056',
                        required: false,
                        conflictType: 'phone'
                    },
                    contact_group: {
                        rule: 'contact-group',
                        selectors: {
                            email: '#field_4164',
                            mobile: '#field_4165',
                            phone: '#field_4056'
                        },
                        required: true,
                        conflictTypes: {
                            email: 'email',
                            mobile: 'mobile',
                            phone: 'phone'
                        }
                    }
                }
            },

            // ===== CONTACT UPDATE FORM =====
            view_5626: {
                formType: 'contact-update',
                allowSharedContacts: true,  // Update forms allow shared contacts (confirm scenario)
                webhook: {
                    url: 'https://hook.us1.make.com/oj9c65b964r1wr4a3w7livb4a469nlgh',
                    enabled: true
                },
                postSubmissionWebhook: {
                    url: 'https://hook.us1.make.com/bs93x9sc5km5xiqgnb8w7dq6x78m0lhb',
                    enabled: true
                },
                // Hidden views containing existing record IDs and original values
                hiddenView: {
                    // Record IDs from details view (view_5630)
                    recordIds: {
                        tenant_id: '#view_5629 .field_3925 .kn-detail-body',
                        parent_record_id: '#view_5630 .field_4135 .kn-detail-body',
                        ecn_record_id: '#view_5630 .field_3926 .kn-detail-body',
                        primary_email_record_id: '#view_5630 .field_4136 .kn-detail-body',
                        primary_mobile_record_id: '#view_5630 .field_4220 .kn-detail-body',
                        primary_phone_record_id: '#view_5630 .field_4137 .kn-detail-body',
                        primary_scn_record_id: '#view_5630 .field_4146 .kn-detail-body',
                        connection_type: '#view_5630 .field_3852 .kn-detail-body'
                    },
                    // Original values from Entity details view (view_5629)
                    originalValues: {
                        first_name: '#view_5629 .field_3860 .kn-detail-body span[data-part="first"]',
                        last_name: '#view_5629 .field_3860 .kn-detail-body span[data-part="last"]',
                        preferred_name: '#view_5629 .field_3861 .kn-detail-body',
                        email: '#view_5629 .field_4164 .kn-detail-body',
                        mobile: '#view_5629 .field_4165 .kn-detail-body',
                        phone: '#view_5629 .field_4056 .kn-detail-body'
                    }
                },
                // Form input fields (same as Create Contact)
                fields: {
                    field_3860: {
                        rule: 'name-fields',
                        selectors: {
                            first: 'input[name="first"]',
                            last: 'input[name="last"]'
                        },
                        required: true
                    },
                    field_3861: {
                        rule: 'proper-case-text',
                        selector: '#field_3861',
                        required: false
                    },
                    field_4164: {
                        rule: 'company-email',
                        selector: '#field_4164',
                        required: false,
                        conflictType: 'email'
                    },
                    field_4165: {
                        rule: 'mobile-number',
                        selector: '#field_4165',
                        required: false,
                        conflictType: 'mobile'
                    },
                    field_4056: {
                        rule: 'landline-number',
                        selector: '#field_4056',
                        required: false,
                        conflictType: 'phone'
                    },
                    contact_group: {
                        rule: 'contact-group',
                        selectors: {
                            email: '#field_4164',
                            mobile: '#field_4165',
                            phone: '#field_4056'
                        },
                        required: true,
                        conflictTypes: {
                            email: 'email',
                            mobile: 'mobile',
                            phone: 'phone'
                        }
                    }
                }
            },

            // ===== CREATE CONTACT WITH COMPANY FORM =====
            // This form creates a contact and links it to a company (parent record)
            view_5631: {
                formType: 'contact-creation',
                allowSharedContacts: true,  // Contact creation allows shared contacts (confirm scenario)
                webhook: {
                    url: 'https://hook.us1.make.com/hhfz1ywcik857a3j3drfxzr221m4tois',
                    enabled: true
                },
                postSubmissionWebhook: {
                    url: 'https://hook.us1.make.com/s4n6e3ajcvh9sm4i0yf3vtzjp46bglqp',
                    enabled: true
                },
                // Hidden view containing the parent company ID
                hiddenView: {
                    recordIds: {
                        parent_record_id: '#view_5633 .field_984 .kn-detail-body'  // Company ID
                    }
                },
                fields: {
                    field_3860: {
                        rule: 'name-fields',
                        selectors: {
                            first: 'input[name="first"]',
                            last: 'input[name="last"]'
                        },
                        required: true
                    },
                    field_3861: {
                        rule: 'proper-case-text',
                        selector: '#field_3861',
                        required: false
                    },
                    field_4164: {
                        rule: 'company-email',
                        selector: '#field_4164',
                        required: false,
                        conflictType: 'email'
                    },
                    field_4165: {
                        rule: 'mobile-number',
                        selector: '#field_4165',
                        required: false,
                        conflictType: 'mobile'
                    },
                    field_4056: {
                        rule: 'landline-number',
                        selector: '#field_4056',
                        required: false,
                        conflictType: 'phone'
                    },
                    contact_group: {
                        rule: 'contact-group',
                        selectors: {
                            email: '#field_4164',
                            mobile: '#field_4165',
                            phone: '#field_4056'
                        },
                        required: true,
                        conflictTypes: {
                            email: 'email',
                            mobile: 'mobile',
                            phone: 'phone'
                        }
                    }
                }
            },

            // ===== QUICK CREATE CONTACT (after company creation) =====
            // Same as view_5631 but gets parent_record_id from field_4358 instead of hidden view
            view_5685: {
                formType: 'contact-creation',
                allowSharedContacts: true,
                isQuickCreate: true,  // Flag to indicate this is the quick-create flow
                webhook: {
                    url: 'https://hook.us1.make.com/hhfz1ywcik857a3j3drfxzr221m4tois',
                    enabled: true
                },
                postSubmissionWebhook: {
                    url: 'https://hook.us1.make.com/s4n6e3ajcvh9sm4i0yf3vtzjp46bglqp',
                    enabled: true
                },
                // Parent record ID stored in hidden text field (populated by JS after company creation)
                parentRecordIdField: '#field_4358',
                fields: {
                    field_3860: {
                        rule: 'name-fields',
                        selectors: {
                            first: 'input[name="first"]',
                            last: 'input[name="last"]'
                        },
                        required: true
                    },
                    field_3861: {
                        rule: 'proper-case-text',
                        selector: '#field_3861',
                        required: false
                    },
                    field_4164: {
                        rule: 'company-email',
                        selector: '#field_4164',
                        required: false,
                        conflictType: 'email'
                    },
                    field_4165: {
                        rule: 'mobile-number',
                        selector: '#field_4165',
                        required: false,
                        conflictType: 'mobile'
                    },
                    field_4056: {
                        rule: 'landline-number',
                        selector: '#field_4056',
                        required: false,
                        conflictType: 'phone'
                    },
                    contact_group: {
                        rule: 'contact-group',
                        selectors: {
                            email: '#field_4164',
                            mobile: '#field_4165',
                            phone: '#field_4056'
                        },
                        required: true,
                        conflictTypes: {
                            email: 'email',
                            mobile: 'mobile',
                            phone: 'phone'
                        }
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
            addFieldError: function (fieldId, message, customSelector = null, viewId = null) {
                console.log(`🎯 Adding error to field: ${fieldId}, Message: '${message}'`);

                // Use unified notification system if viewId provided
                if (viewId && typeof notificationSystem !== 'undefined') {
                    notificationSystem.showFieldNotification(viewId, fieldId, message, 'error');
                } else {
                    // Fallback to old style if viewId not provided (legacy compatibility)
                    const selector = customSelector || `#kn-input-${fieldId}`;
                    const $field = $(selector);
                    $field.addClass('kn-error');

                    let $errorDiv = $field.find('.validation-error-message');
                    if ($errorDiv.length === 0) {
                        $errorDiv = $('<div class="kn-message is-error validation-error-message" style="margin-top: 5px; display: block !important; visibility: visible !important; opacity: 1 !important;"><span class="kn-message-body"></span></div>');
                        $field.append($errorDiv);
                    }
                    $errorDiv.find('.kn-message-body').text(message);
                    $errorDiv.css({
                        'display': 'block',
                        'visibility': 'visible',
                        'opacity': '1'
                    }).show();
                }

                console.log(`❌ Validation error added to ${fieldId}: ${message}`);
            },

            /**
             * Removes error styling and message from a field
             */
            removeFieldError: function (fieldId, customSelector = null, viewId = null) {
                // Use unified notification system if viewId provided
                if (viewId && typeof notificationSystem !== 'undefined') {
                    notificationSystem.clearFieldNotification(viewId, fieldId);

                    // Also clear duplicate handler error state if it exists
                    // This ensures webhook-based errors are cleared when validation clears the field
                    if (typeof duplicateHandler !== 'undefined' && duplicateHandler.fieldErrors[viewId]) {
                        if (duplicateHandler.fieldErrors[viewId][fieldId]) {
                            console.log(`🔗 Also clearing duplicateHandler error for ${fieldId}`);
                            delete duplicateHandler.fieldErrors[viewId][fieldId];

                            // Clear last error value too
                            if (duplicateHandler.lastErrorValues[viewId]) {
                                delete duplicateHandler.lastErrorValues[viewId][fieldId];
                            }

                            // Re-enable submit if no more errors
                            if (duplicateHandler.hasNoErrors(viewId)) {
                                duplicateHandler.enableSubmit(viewId);
                            }
                        }
                    }
                } else {
                    // Fallback to old style if viewId not provided (legacy compatibility)
                    const selector = customSelector || `#kn-input-${fieldId}`;
                    const $field = $(selector);
                    $field.removeClass('kn-error');
                    $field.find('.validation-error-message').remove();
                }

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
            addConfirmationMessage: function (fieldId, message, customSelector = null, viewId = null) {
                // Scope selector to view if viewId provided (prevents conflicts between views with same field)
                let selector;
                if (customSelector) {
                    selector = customSelector;
                } else if (viewId) {
                    selector = `#${viewId} #kn-input-${fieldId}`;
                } else {
                    selector = `#kn-input-${fieldId}`;
                }
                const $field = $(selector);

                console.log(`🟢 Adding confirmation to field: ${fieldId} (view: ${viewId || 'global'}), Message: '${message}'`);

                if ($field.length === 0) {
                    console.warn(`⚠️ Could not find field container for confirmation: ${selector}`);
                    return;
                }

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
            removeConfirmationMessage: function (fieldId, customSelector = null, viewId = null) {
                // Scope selector to view if viewId provided
                let selector;
                if (customSelector) {
                    selector = customSelector;
                } else if (viewId) {
                    selector = `#${viewId} #kn-input-${fieldId}`;
                } else {
                    selector = `#kn-input-${fieldId}`;
                }
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
                        console.log(`✅ AU mobile validation passed - normalizing to +61 format`);
                        // Convert to international format: remove leading 0, add +61
                        const normalized = '+61' + localNumber.substring(1);
                        return { isValid: true, normalizedValue: normalized, error: '' };
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
                // Supports: ext 456, extension 456, x 456, X 456, :456, ,456, etc.
                // NOTE: Space alone is NOT a delimiter (to avoid matching "03 9048 4411")
                const wordExtensions = /\s+(ext|extension|x)\s*\.?\s*:?\s*(\d{1,5})$/i;
                const symbolExtensions = /[,\/;|:]\s*(\d{1,5})$/;

                let mainNumber = input;
                let extension = '';
                let hasExtension = false;

                // Check for word-based extensions (ext, extension, x, X)
                let extMatch = input.match(wordExtensions);
                if (extMatch) {
                    mainNumber = input.replace(wordExtensions, '').trim();
                    extension = extMatch[2];
                    hasExtension = true;
                    console.log(`📞 Found extension with word delimiter '${extMatch[1]}': Main='${mainNumber}', Ext='${extension}'`);
                } else {
                    // Check for symbol-based extensions (, / ; | :)
                    // This will catch: "03 9048 4411:456", "03 9048 4411,456", etc.
                    extMatch = input.match(symbolExtensions);
                    if (extMatch) {
                        mainNumber = input.replace(symbolExtensions, '').trim();
                        extension = extMatch[1];
                        hasExtension = true;
                        console.log(`📞 Found extension with symbol delimiter: Main='${mainNumber}', Ext='${extension}'`);
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

                    // Check for 1300/1800 service numbers
                    const firstFourDigits = localPart.substring(0, 4);
                    if (firstFourDigits === '1300' || firstFourDigits === '1800') {
                        // 1300/1800 numbers: 4 digits prefix + 2 or 6 more digits = 6 or 10 total
                        if (localPart.length !== 6 && localPart.length !== 10) {
                            return {
                                isValid: false,
                                error: `${firstFourDigits} numbers must be either 6 digits or 10 digits`,
                                normalizedValue: '',
                                hasAreaCodeCorrection: false
                            };
                        }
                        // Convert to domestic format (remove +61, no leading zero for service numbers)
                        normalizedNumber = localPart;
                        console.log(`📞 ${firstFourDigits} service number accepted (converted from +61): '${normalizedNumber}'`);
                    } else {
                        // Standard landlines should be exactly 9 digits after +61 (area code + 8-digit local number)
                        // Do NOT auto-correct international format - validate as-is
                        if (localPart.length < 9) {
                            return {
                                isValid: false,
                                error: `Phone number too short - need ${9 - localPart.length} more digit(s) (e.g., +61390484411)`,
                                normalizedValue: '',
                                hasAreaCodeCorrection: false
                            };
                        }
                        if (localPart.length > 9) {
                            return {
                                isValid: false,
                                error: `Phone number too long - remove ${localPart.length - 9} digit(s) (e.g., +61390484411)`,
                                normalizedValue: '',
                                hasAreaCodeCorrection: false
                            };
                        }

                        // Check if it's a mobile number (starts with 4 or 5, which is 04/05 in domestic format)
                        const firstDigit = localPart.substring(0, 1);
                        if (firstDigit === '4' || firstDigit === '5') {
                            return {
                                isValid: false,
                                error: 'Mobiles not permitted in this field - landlines only (mobiles are for personal contacts)',
                                normalizedValue: '',
                                hasAreaCodeCorrection: false
                            };
                        }

                        // Check if it starts with valid area code (without leading 0)
                        const areaCode = firstDigit; // First digit after +61
                        const validFirstDigits = ['2', '3', '7', '8']; // Corresponds to 02, 03, 07, 08
                        if (!validFirstDigits.includes(areaCode)) {
                            return { isValid: false, error: `Invalid Australian area code`, normalizedValue: '', hasAreaCodeCorrection: false };
                        }

                        normalizedNumber = '+61' + localPart;
                    }
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

                    // Check for 1300/1800 service numbers
                    const firstFourDigits = localPart.substring(0, 4);
                    if (firstFourDigits === '1300' || firstFourDigits === '1800') {
                        if (localPart.length !== 6 && localPart.length !== 10) {
                            return {
                                isValid: false,
                                error: `${firstFourDigits} numbers must be either 6 digits or 10 digits`,
                                normalizedValue: '',
                                hasAreaCodeCorrection: false
                            };
                        }
                        normalizedNumber = localPart;
                        console.log(`📞 ${firstFourDigits} service number accepted (converted from 0061): '${normalizedNumber}'`);
                    } else {
                        // Australian landlines should be exactly 9 digits - do NOT auto-correct
                        if (localPart.length < 9) {
                            return {
                                isValid: false,
                                error: `Phone number too short - need ${9 - localPart.length} more digit(s) (e.g., 0061390484411)`,
                                normalizedValue: '',
                                hasAreaCodeCorrection: false
                            };
                        }
                        if (localPart.length > 9) {
                            return {
                                isValid: false,
                                error: `Phone number too long - remove ${localPart.length - 9} digit(s) (e.g., 0061390484411)`,
                                normalizedValue: '',
                                hasAreaCodeCorrection: false
                            };
                        }

                        const areaCode = localPart.substring(0, 1);
                        const validFirstDigits = ['2', '3', '7', '8'];
                        if (!validFirstDigits.includes(areaCode)) {
                            return { isValid: false, error: `Invalid Australian area code`, normalizedValue: '', hasAreaCodeCorrection: false };
                        }

                        normalizedNumber = '+61' + localPart;
                    }
                } else if (cleaned.match(/^61[0-9]/)) {
                    // 61 without + at start - treat as Australian international
                    let localPart = cleaned.substring(2);

                    if (localPart.startsWith('0')) {
                        localPart = localPart.substring(1);
                    }

                    console.log(`🇦🇺 International 61 - Local part: '${localPart}', Length: ${localPart.length}`);

                    // Check for 1300/1800 service numbers
                    const firstFourDigits = localPart.substring(0, 4);
                    if (firstFourDigits === '1300' || firstFourDigits === '1800') {
                        if (localPart.length !== 6 && localPart.length !== 10) {
                            return {
                                isValid: false,
                                error: `${firstFourDigits} numbers must be either 6 digits or 10 digits`,
                                normalizedValue: '',
                                hasAreaCodeCorrection: false
                            };
                        }
                        normalizedNumber = localPart;
                        console.log(`📞 ${firstFourDigits} service number accepted (converted from 61): '${normalizedNumber}'`);
                    } else {
                        // Australian landlines should be exactly 9 digits - do NOT auto-correct
                        if (localPart.length < 9) {
                            return {
                                isValid: false,
                                error: `Phone number too short - need ${9 - localPart.length} more digit(s) (e.g., 61390484411)`,
                                normalizedValue: '',
                                hasAreaCodeCorrection: false
                            };
                        }
                        if (localPart.length > 9) {
                            return {
                                isValid: false,
                                error: `Phone number too long - remove ${localPart.length - 9} digit(s) (e.g., 61390484411)`,
                                normalizedValue: '',
                                hasAreaCodeCorrection: false
                            };
                        }

                        const areaCode = localPart.substring(0, 1);
                        const validFirstDigits = ['2', '3', '7', '8'];
                        if (!validFirstDigits.includes(areaCode)) {
                            return { isValid: false, error: `Invalid Australian area code`, normalizedValue: '', hasAreaCodeCorrection: false };
                        }

                        normalizedNumber = '+61' + localPart;
                    }
                } else if (cleaned.startsWith('0')) {
                    // Australian number with area code or service number (1300/1800)

                    // Check for 1300 and 1800 service numbers first
                    const firstFourDigits = cleaned.substring(0, 4);
                    if (firstFourDigits === '1300' || firstFourDigits === '1800') {
                        // 1300/1800 numbers can be 6 or 10 digits total
                        if (cleaned.length !== 6 && cleaned.length !== 10) {
                            return {
                                isValid: false,
                                error: `${firstFourDigits} numbers must be either 6 digits (${firstFourDigits.substring(0, 4)} XX) or 10 digits (${firstFourDigits} XXX XXX)`,
                                normalizedValue: '',
                                hasAreaCodeCorrection: false
                            };
                        }
                        // Keep 1300/1800 numbers in domestic format (don't convert to +61)
                        normalizedNumber = cleaned;
                        console.log(`📞 ${firstFourDigits} service number accepted: '${normalizedNumber}'`);
                    } else {
                        // Standard landline numbers
                        if (cleaned.length < 10) {
                            return { isValid: false, error: 'Phone number too short - Australian landlines require 10 digits including area code (e.g., 03 9048 4411)', normalizedValue: '', hasAreaCodeCorrection: false };
                        }
                        if (cleaned.length > 10) {
                            return { isValid: false, error: 'Too many digits - Australian landlines require 10 digits including area code (e.g., 03 9048 4411)', normalizedValue: '', hasAreaCodeCorrection: false };
                        }

                        // Check if it's a mobile number (starts with 04 or 05)
                        const firstTwoDigits = cleaned.substring(0, 2);
                        if (firstTwoDigits === '04' || firstTwoDigits === '05') {
                            return {
                                isValid: false,
                                error: 'Mobiles not permitted in this field - landlines only (mobiles are for personal contacts)',
                                normalizedValue: '',
                                hasAreaCodeCorrection: false
                            };
                        }

                        // Validate Australian area codes
                        const areaCode = cleaned.substring(0, 2);
                        const validAreaCodes = ['02', '03', '07', '08'];
                        if (!validAreaCodes.includes(areaCode)) {
                            return { isValid: false, error: `Invalid Australian area code: ${areaCode} - must be 02, 03, 07, or 08`, normalizedValue: '', hasAreaCodeCorrection: false };
                        }

                        // Convert to +61 format: remove leading 0, add +61
                        normalizedNumber = '+61' + cleaned.substring(1);
                    }
                } else {
                    // No area code - assume Victoria (03) and add it
                    if (cleaned.length === 8) {
                        // Add area code 03 then convert to +61 format
                        normalizedNumber = '+61' + '3' + cleaned;
                        hasAreaCodeCorrection = true;
                        console.log(`🎯 Added Victorian area code 03 to: '${cleaned}' → '${normalizedNumber}'`);
                    } else if (cleaned.length < 8) {
                        return { isValid: false, error: 'Phone number too short - need 8 digits (area code will be added automatically)', normalizedValue: '', hasAreaCodeCorrection: false };
                    } else {
                        return { isValid: false, error: 'Too many digits - expecting 8 digits (area code will be added automatically)', normalizedValue: '', hasAreaCodeCorrection: false };
                    }
                }

                // Step 7: Add extension back if present (using comma format)
                const finalNumber = hasExtension ? `${normalizedNumber},${extension}` : normalizedNumber;

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

                        // Check if valid Australian mobile format with detailed error messages
                        if (localNumber.length < 10) {
                            console.log(`❌ AU mobile validation failed - Not enough digits (${localNumber.length} digits, need 10)`);
                            return {
                                isValid: false,
                                error: `Not enough digits - Australian mobile numbers require 10 digits (you entered ${localNumber.length})`,
                                normalizedValue: ''
                            };
                        }

                        if (localNumber.length > 10) {
                            console.log(`❌ AU mobile validation failed - Too many digits (${localNumber.length} digits, max 10)`);
                            return {
                                isValid: false,
                                error: `Too many digits - Australian mobile numbers require 10 digits (you entered ${localNumber.length})`,
                                normalizedValue: ''
                            };
                        }

                        if (!localNumber.startsWith('0')) {
                            console.log(`❌ AU mobile validation failed - Doesn't start with 0`);
                            return {
                                isValid: false,
                                error: 'Australian mobile numbers must start with 0 (e.g., 0416 123 456)',
                                normalizedValue: ''
                            };
                        }

                        if (!australianMobilePattern.test(localNumber.substring(1))) {
                            console.log(`❌ AU mobile validation failed - Not a mobile number (doesn't start with 04 or 05)`);
                            return {
                                isValid: false,
                                error: 'Not a mobile number - Australian mobiles must start with 04 or 05 (e.g., 0416 123 456)',
                                normalizedValue: ''
                            };
                        }

                        console.log(`✅ AU mobile validation passed - normalizing to +61 format`);
                        // Convert to international format: remove leading 0, add +61
                        const normalized = '+61' + localNumber.substring(1);
                        return { isValid: true, normalizedValue: normalized, error: '' };
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
                        const errorMessage = result.errorMessage || fieldConfig.message || ruleDefinition.defaultMessage;

                        // Use custom displayError if defined (e.g., contact-group, name-fields), otherwise use standard
                        if (ruleDefinition.displayError) {
                            ruleDefinition.displayError(fieldId, errorMessage, utils, fieldConfig, viewId);
                        } else {
                            utils.addFieldError(fieldId, errorMessage, null, viewId);
                        }

                        errors.push(errorMessage);
                        console.log(`❌ ${fieldConfig.rule} validation failed for ${fieldId}: ${errorMessage}`);
                        isValid = false;
                    } else {
                        // Use custom clearError if defined (e.g., contact-group, name-fields), otherwise use standard
                        if (ruleDefinition.clearError) {
                            ruleDefinition.clearError(fieldId, utils, fieldConfig, viewId);
                        } else {
                            utils.removeFieldError(fieldId, null, viewId);
                        }

                        // Update field with normalized value if provided
                        if (result.normalizedValue && result.normalizedValue !== fieldValue) {
                            $field.val(result.normalizedValue);
                            console.log(`🔄 Field ${fieldId} normalized: ${result.normalizedValue}`);
                        }

                        // Handle special cases for certain rule types
                        if (fieldConfig.rule === 'landline-number' || fieldConfig.rule === 'company-phone') {
                            utils.removeConfirmationMessage(fieldId, null, viewId);
                            if (result.hasAreaCodeCorrection) {
                                utils.addConfirmationMessage(fieldId, 'Please confirm area code', null, viewId);
                                console.log(`🟢 Area code confirmation shown for ${fieldId} in ${viewId}`);
                            }
                        }

                        // Handle warnings for company-name rule
                        if (fieldConfig.rule === 'company-name') {
                            if (result.hasWarning && result.warningMessage) {
                                if (ruleDefinition.displayWarning) {
                                    ruleDefinition.displayWarning(fieldId, result.warningMessage, utils);
                                    console.log(`⚠️ Warning shown for ${fieldId}: ${result.warningMessage}`);
                                }
                            } else {
                                if (ruleDefinition.clearWarning) {
                                    ruleDefinition.clearWarning(fieldId, utils);
                                }
                            }
                        }

                        console.log(`✅ ${fieldConfig.rule} validation passed for ${fieldId}`);
                    }
                }

                return { isValid, errors };
            }
        };

        // ========================================================================
        // COMPANY FORM HANDLER
        // Specialized handler for company creation and update forms
        // ========================================================================
        const companyFormHandler = {

            /**
             * Normalize company name for searching
             * Removes common suffixes and normalizes text
             */
            normalizeCompanyName: function (companyName) {
                if (!companyName) return '';

                return companyName
                    .toLowerCase()
                    .replace(/\spty\sltd/g, '')  // Remove "Pty Ltd"
                    .replace(/\sltd\b/g, '')      // Remove "Ltd"
                    .replace(/'/g, '')             // Remove apostrophes
                    .replace(/\s+/g, ' ')          // Normalize spaces
                    .trim();
            },

            /**
             * Normalize street address for searching
             */
            normalizeStreetAddress: function (address) {
                if (!address) return '';

                return address
                    .toLowerCase()
                    .replace(/\s+/g, ' ')
                    .trim();
            },

            /**
             * Normalize email
             * - Preserves local part (before @) casing as entered
             * - Converts domain (after @) to lowercase
             * - Removes all whitespace
             */
            normalizeEmail: function (email) {
                if (!email) return '';

                // Remove all whitespace first
                const trimmed = email.replace(/\s+/g, '');

                // Find @ symbol
                const atIndex = trimmed.indexOf('@');
                if (atIndex === -1) {
                    // No @ found, just return trimmed (invalid email, but preserve for validation)
                    return trimmed;
                }

                // Split into local part and domain
                const localPart = trimmed.substring(0, atIndex); // Keep original casing
                const domain = trimmed.substring(atIndex + 1).toLowerCase(); // Force lowercase

                return localPart + '@' + domain;
            },

            /**
             * Normalize phone number (adds +61 prefix if needed)
             */
            normalizePhone: function (phone) {
                if (!phone) return '';

                // Use existing validator normalization
                const result = validator.normalizeLandlineNumber(phone);
                let normalized = result.normalizedValue || '';

                // Ensure phone has country code with + prefix
                if (normalized) {
                    if (result.isTollFree) {
                        // 1300/1800 numbers: add +61 prefix
                        normalized = `+61${normalized}`;
                    } else if (!normalized.startsWith('+')) {
                        // Landline without + prefix: add it
                        normalized = normalized.startsWith('61') ? `+${normalized}` : `+61${normalized}`;
                    }
                }

                return normalized;
            },

            /**
             * Build payload for company forms (create or update)
             * This is called BEFORE form submission for duplicate checking
             */
            buildPreSubmissionPayload: function (viewId, formData) {
                const config = viewConfigs[viewId];
                const formType = config.formType; // 'company-creation' or 'company-update'

                console.log(`🏢 Building ${formType} payload for ${viewId}`);

                // Get current user
                let currentUserId = null;
                let currentUserEmail = null;
                try {
                    if (Knack && Knack.getUserAttributes) {
                        const userAttrs = Knack.getUserAttributes();
                        currentUserId = userAttrs.id || null;
                        currentUserEmail = userAttrs.email || null;
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not get current user info:`, error);
                }

                // Extract ECN record ID from URL (for update forms)
                // URL pattern: #contacts6/view-contact3/{ecn_id}/update-company/{ecn_id}/
                let ecnRecordId = null;
                try {
                    const hash = window.location.hash;
                    if (hash) {
                        const segments = hash.replace(/^#/, '').split('/');
                        // Look for 'update-company' segment and get the ID after it
                        const updateCompanyIndex = segments.indexOf('update-company');
                        if (updateCompanyIndex !== -1 && segments[updateCompanyIndex + 1]) {
                            ecnRecordId = segments[updateCompanyIndex + 1];
                            console.log(`🏢 Extracted ECN record ID from URL (after update-company): ${ecnRecordId}`);
                        } else if (segments.length >= 3 && segments[2]) {
                            // Fallback: third segment (after scene/page)
                            ecnRecordId = segments[2];
                            console.log(`🏢 Extracted ECN record ID from URL (fallback position): ${ecnRecordId}`);
                        }
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not extract ECN ID from URL:`, error);
                }

                // Get tenant_id from Knack app info
                const tenantId = Knack.application_id || '648a5861b632b20027d53b8b';

                // Extract form field values using config selectors
                const fields = config.fields;

                // Company name
                const companyNameRaw = fields.field_992 ? $(fields.field_992.selector).val() || '' : '';

                // Short name
                const companyShortNameRaw = fields.field_3783 ? $(fields.field_3783.selector).val() || '' : '';

                // Address (composite field)
                let streetAddressRaw = '';
                let addressStreet = '';
                let addressStreet2 = '';
                let addressCity = '';
                let addressState = '';
                let addressZip = '';
                if (fields.address && fields.address.selectors) {
                    addressStreet = $(fields.address.selectors.street).val() || '';
                    addressStreet2 = $(fields.address.selectors.street2).val() || '';
                    addressCity = $(fields.address.selectors.city).val() || '';
                    addressState = $(fields.address.selectors.state).val() || '';
                    addressZip = $(fields.address.selectors.zip).val() || '';

                    // Build formatted address for comparison
                    // Format: "Street\nCity, State Zip" or "Street\nStreet2\nCity, State Zip"
                    if (addressStreet2) {
                        streetAddressRaw = `${addressStreet}\n${addressStreet2}\n${addressCity}, ${addressState} ${addressZip}`;
                    } else {
                        streetAddressRaw = `${addressStreet}\n${addressCity}, ${addressState} ${addressZip}`;
                    }
                }

                // Email
                const emailRaw = fields.field_4164 ? $(fields.field_4164.selector).val() || '' : '';

                // Phone
                const phoneRaw = fields.field_4056 ? $(fields.field_4056.selector).val() || '' : '';

                // Normalize all fields
                const companyNameNormalised = companyNameRaw;
                const companySearch = this.normalizeCompanyName(companyNameRaw);
                const companyShortSearch = this.normalizeCompanyName(companyShortNameRaw);
                const streetAddressNormalised = streetAddressRaw.trim();
                const streetAddressSearch = this.normalizeStreetAddress(streetAddressRaw);
                const emailNormalised = this.normalizeEmail(emailRaw);
                const phoneNormalised = this.normalizePhone(phoneRaw);

                // Build base payload (common to both create and update)
                const payload = {
                    view: viewId,
                    form_type: formType,
                    allow_shared_contacts: config.allowSharedContacts !== false,  // Default true if not specified
                    timestamp: new Date().toISOString(),
                    tenant_id: tenantId,
                    current_user: {
                        id: currentUserId,
                        email: currentUserEmail
                    },
                    ecn_record_id: ecnRecordId,
                    company_name_normalised: companyNameNormalised,
                    company_search: companySearch,
                    company_short_search: companyShortSearch,
                    street_address_normalised: streetAddressNormalised,
                    street_address_search: streetAddressSearch,
                    address_street: addressStreet,
                    address_street2: addressStreet2,
                    address_city: addressCity,
                    address_state: addressState,
                    address_zip: addressZip,
                    email_normalised: emailNormalised,
                    phone_normalised: phoneNormalised,
                    data: {
                        form_type: formType,
                        allow_shared_contacts: config.allowSharedContacts !== false,
                        company_name_normalised: companyNameNormalised,
                        company_search: companySearch,
                        company_short_search: companyShortSearch,
                        street_address_normalised: streetAddressNormalised,
                        street_address_search: streetAddressSearch,
                        address_street: addressStreet,
                        address_street2: addressStreet2,
                        address_city: addressCity,
                        address_state: addressState,
                        address_zip: addressZip,
                        email: emailNormalised,
                        phone: phoneNormalised,
                        tenant_id: tenantId
                    }
                };

                // Add update-specific fields ONLY for company-update forms
                if (formType === 'company-update') {
                    // Get existing record IDs from hidden view
                    const existingRecordIds = this.getExistingRecordIds(viewId);

                    // Get original values from hidden view
                    const originalValues = this.getOriginalValues(viewId);

                    // Detect changes
                    const changeDetection = this.detectChanges(
                        originalValues,
                        companyNameNormalised,
                        companyShortNameRaw,
                        streetAddressRaw,
                        emailNormalised,
                        phoneNormalised
                    );

                    // Add to top level
                    payload.company_record_id = existingRecordIds.company_record_id;
                    payload.primary_email_record_id = existingRecordIds.primary_email_record_id;
                    payload.primary_phone_record_id = existingRecordIds.primary_phone_record_id;
                    payload.primary_scn_record_id = existingRecordIds.primary_scn_record_id;
                    payload.original_values = originalValues;
                    payload.company_name_has_changed = changeDetection.company_name_has_changed;
                    payload.company_short_name_has_changed = changeDetection.company_short_name_has_changed;
                    payload.street_address_has_changed = changeDetection.street_address_has_changed;
                    payload.email_has_changed = changeDetection.email_has_changed;
                    payload.phone_has_changed = changeDetection.phone_has_changed;
                    payload.email_was_deleted = changeDetection.email_was_deleted;
                    payload.phone_was_deleted = changeDetection.phone_was_deleted;

                    // Add to data object
                    payload.data.company_record_id = existingRecordIds.company_record_id;
                    payload.data.primary_email_record_id = existingRecordIds.primary_email_record_id;
                    payload.data.primary_phone_record_id = existingRecordIds.primary_phone_record_id;
                    payload.data.primary_scn_record_id = existingRecordIds.primary_scn_record_id;
                    payload.data.original_values = originalValues;
                    payload.data.company_name_has_changed = changeDetection.company_name_has_changed;
                    payload.data.company_short_name_has_changed = changeDetection.company_short_name_has_changed;
                    payload.data.street_address_has_changed = changeDetection.street_address_has_changed;
                    payload.data.email_has_changed = changeDetection.email_has_changed;
                    payload.data.phone_has_changed = changeDetection.phone_has_changed;
                    payload.data.email_was_deleted = changeDetection.email_was_deleted;
                    payload.data.phone_was_deleted = changeDetection.phone_was_deleted;

                    // Store original values and change detection for post-submission webhook
                    window._originalFormValues = originalValues;
                    window._preSubmissionChangeDetection = changeDetection;
                    console.log(`📋 Stored original values and change detection for post-submission webhook`);
                } else {
                    // For creation forms, these fields should be null
                    payload.company_record_id = null;
                    payload.primary_email_record_id = null;
                    payload.primary_phone_record_id = null;

                    payload.data.company_record_id = null;
                    payload.data.primary_email_record_id = null;
                    payload.data.primary_phone_record_id = null;
                }

                console.log(`📦 Built ${formType} payload:`, payload);
                return payload;
            },

            /**
             * Get existing record IDs from hidden view (for update forms only)
             */
            getExistingRecordIds: function (viewId) {
                const config = viewConfigs[viewId];
                const hiddenView = config.hiddenView;

                if (!hiddenView) {
                    console.warn(`⚠️ No hidden view configured for ${viewId}`);
                    return {
                        company_record_id: null,
                        primary_email_record_id: null,
                        primary_phone_record_id: null,
                        primary_scn_record_id: null
                    };
                }

                const ids = {
                    company_record_id: null,
                    primary_email_record_id: null,
                    primary_phone_record_id: null,
                    primary_scn_record_id: null
                };

                try {
                    // Extract record IDs from hidden view selectors
                    Object.keys(hiddenView.recordIds).forEach(key => {
                        const selector = hiddenView.recordIds[key];
                        const $element = $(selector);
                        if ($element.length > 0) {
                            ids[key] = $element.text().trim() || $element.val() || null;
                            console.log(`✅ Found ${key}: ${ids[key]}`);
                        } else {
                            console.log(`ℹ️ No ${key} found (may be null)`);
                        }
                    });
                } catch (error) {
                    console.error(`❌ Error getting existing record IDs:`, error);
                }

                return ids;
            },

            /**
             * Get original values from hidden view (for update forms only)
             */
            getOriginalValues: function (viewId) {
                const config = viewConfigs[viewId];
                const hiddenView = config.hiddenView;

                if (!hiddenView || !hiddenView.originalValues) {
                    console.warn(`⚠️ No original values configured for ${viewId}`);
                    return {};
                }

                const values = {};

                try {
                    Object.keys(hiddenView.originalValues).forEach(key => {
                        const selector = hiddenView.originalValues[key];
                        const $element = $(selector);
                        if ($element.length > 0) {
                            values[key] = $element.text().trim() || '';
                            console.log(`📋 Original ${key}: ${values[key]}`);
                        }
                    });
                } catch (error) {
                    console.error(`❌ Error getting original values:`, error);
                }

                return values;
            },

            /**
             * Detect changes between original and current values (for update forms only)
             */
            detectChanges: function (originalValues, companyName, companyShortName, streetAddress, email, phone) {
                const originalNameSearch = this.normalizeCompanyName(originalValues.company_name || '');
                const currentNameSearch = this.normalizeCompanyName(companyName);

                const originalShortSearch = this.normalizeCompanyName(originalValues.company_short_name || '');
                const currentShortSearch = this.normalizeCompanyName(companyShortName);

                const originalAddressSearch = this.normalizeStreetAddress(originalValues.street_address || '');
                const currentAddressSearch = this.normalizeStreetAddress(streetAddress);

                const originalEmailNorm = this.normalizeEmail(originalValues.email || '');
                const currentEmailNorm = this.normalizeEmail(email);

                const originalPhoneNorm = this.normalizePhone(originalValues.phone || '');
                const currentPhoneNorm = this.normalizePhone(phone);

                const changes = {
                    company_name_has_changed: (currentNameSearch !== originalNameSearch),
                    company_short_name_has_changed: (currentShortSearch !== originalShortSearch),
                    street_address_has_changed: (currentAddressSearch !== originalAddressSearch),
                    email_has_changed: (currentEmailNorm !== originalEmailNorm),
                    phone_has_changed: (currentPhoneNorm !== originalPhoneNorm),
                    email_was_deleted: (originalEmailNorm !== '' && currentEmailNorm === ''),
                    phone_was_deleted: (originalPhoneNorm !== '' && currentPhoneNorm === '')
                };

                console.log(`🔍 Change detection:`, changes);

                return changes;
            },

            /**
             * Build post-submission payload with actual company_id
             * This is called AFTER form submission completes
             */
            buildPostSubmissionPayload: function (viewId, submissionResponse) {
                const config = viewConfigs[viewId];
                const formType = config.formType;

                console.log(`🏢 Building post-submission payload for ${formType} (${viewId})`);

                // Get current user
                let currentUserId = null;
                let currentUserEmail = null;
                try {
                    if (Knack && Knack.getUserAttributes) {
                        const userAttrs = Knack.getUserAttributes();
                        currentUserId = userAttrs.id || null;
                        currentUserEmail = userAttrs.email || null;
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not get current user info:`, error);
                }

                // Extract company_id (ENT record ID) from submission response
                let companyId = null;
                try {
                    // Knack returns the record ID directly in response.id for form submissions
                    if (submissionResponse && submissionResponse.id) {
                        companyId = submissionResponse.id;
                        console.log(`✅ Extracted company_id from submission response.id: ${companyId}`);
                    } else if (submissionResponse && submissionResponse.record && submissionResponse.record.id) {
                        companyId = submissionResponse.record.id;
                        console.log(`✅ Extracted company_id from submission response.record.id: ${companyId}`);
                    } else {
                        console.warn(`⚠️ Could not find company_id in submission response. Keys:`, submissionResponse ? Object.keys(submissionResponse) : 'null');
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not extract company_id from submission:`, error);
                }

                // Get ECN record ID from Knack response (stored during post-submission event handler)
                let ecnRecordId = window._ecnRecordId || null;

                if (ecnRecordId) {
                    console.log(`✅ Using ECN record ID from Knack response: ${ecnRecordId}`);
                } else {
                    // Fallback: Extract ECN record ID from URL
                    try {
                        const hash = window.location.hash;
                        if (hash) {
                            const segments = hash.replace(/^#/, '').split('/');
                            if (segments.length >= 3 && segments[2]) {
                                ecnRecordId = segments[2];
                                console.log(`🔗 Extracted ECN record ID from URL: ${ecnRecordId}`);
                            }
                        }
                    } catch (error) {
                        console.warn(`⚠️ Could not extract ECN ID from URL:`, error);
                    }
                }

                // Get tenant_id
                const tenantId = '648a5861b632b20027d53b8b'; // TODO: Get from config

                // Use stored form data (captured just before submission)
                // Form fields are no longer accessible after redirect
                const storedFormData = window._preSubmissionFormData || {};
                console.log(`📂 Using stored form data (keys):`, Object.keys(storedFormData));
                console.log(`📂 Stored form data (full):`, JSON.stringify(storedFormData, null, 2));

                // Extract values from stored form data
                const companyNameRaw = storedFormData.field_992 || '';
                const companyShortNameRaw = storedFormData.field_3783 || '';
                const emailRaw = storedFormData.field_4164 || '';
                const phoneRaw = storedFormData.field_4056 || '';

                // Extract address fields from stored data
                let streetAddressRaw = '';
                let street2Raw = '';
                let cityRaw = '';
                let stateRaw = '';
                let zipRaw = '';

                if (storedFormData.address) {
                    streetAddressRaw = storedFormData.address.street || '';
                    street2Raw = storedFormData.address.street2 || '';
                    cityRaw = storedFormData.address.city || '';
                    stateRaw = storedFormData.address.state || '';
                    zipRaw = storedFormData.address.zip || '';
                }

                // Normalize all fields
                const companyNameNormalised = companyNameRaw;
                const companySearch = this.normalizeCompanyName(companyNameRaw);
                const companyShortSearch = this.normalizeCompanyName(companyShortNameRaw);

                // Build full address string for search and formatted display
                let formattedStreetAddress = '';
                let streetAddressSearch = '';

                if (streetAddressRaw || cityRaw || stateRaw || zipRaw) {
                    const addressParts = [];
                    if (streetAddressRaw) addressParts.push(streetAddressRaw);
                    if (street2Raw) addressParts.push(street2Raw);
                    if (cityRaw) addressParts.push(cityRaw);
                    if (stateRaw) addressParts.push(stateRaw);
                    if (zipRaw) addressParts.push(zipRaw);

                    formattedStreetAddress = addressParts.join(', ');
                    streetAddressSearch = this.normalizeStreetAddress(formattedStreetAddress);
                }

                const emailNormalised = this.normalizeEmail(emailRaw);
                const phoneNormalised = this.normalizePhone(phoneRaw);

                // Retrieve original values from window storage (set during pre-submission)
                const originalFormValues = window._originalFormValues || {};
                const preSubmissionChangeDetection = window._preSubmissionChangeDetection || {};

                // Recalculate change detection based on FINAL submitted values
                let finalChangeDetection = {
                    company_name_has_changed: false,
                    company_short_name_has_changed: false,
                    street_address_has_changed: false,
                    email_has_changed: false,
                    phone_has_changed: false,
                    email_was_deleted: false,
                    phone_was_deleted: false
                };

                if (formType === 'company-update' && Object.keys(originalFormValues).length > 0) {
                    console.log(`📊 Recalculating change detection based on FINAL submitted values`);
                    finalChangeDetection = this.detectChanges(
                        originalFormValues,
                        companyNameNormalised,
                        companyShortNameRaw,
                        streetAddressRaw,
                        emailNormalised,
                        phoneNormalised
                    );
                }

                // Build knack_api_payloads from actual submitted form data
                // This ensures we use what was actually submitted, not pre-submission validation
                let knackApiPayloads = [];
                let comActionType = 'create_all';
                let sharedComIds = '';
                let isTest = false;

                const emailHasValue = emailNormalised && emailNormalised.trim() !== '';
                const phoneHasValue = phoneNormalised && phoneNormalised.trim() !== '';

                // Build email payload if email exists
                if (emailHasValue) {
                    const emailParts = emailNormalised.split('@');
                    const emailLocal = emailParts[0] || '';
                    const emailDomain = emailParts[1] || '';

                    // Extract contact name from email (e.g., "info" from "info@example.com")
                    const contactName = emailLocal.charAt(0).toUpperCase() + emailLocal.slice(1);

                    knackApiPayloads.push({
                        field_3988: 'Email',                    // Communication type
                        field_3869: emailNormalised,            // Email normalized (lowercase for search)
                        field_3968: emailRaw,                   // Email formatted (original as entered)
                        field_3969: emailDomain,                // Domain
                        field_3970: contactName,                // Contact name
                        field_3982: 'Company',                  // Entity type
                        field_3876: 'Active',                   // Status
                        field_3881: currentUserId,              // Created by (current user ID)
                        field_4016: tenantId                    // Tenant ID
                    });
                }

                // Build phone payload if phone exists
                if (phoneHasValue) {
                    // Extract country code and national number
                    // Assuming phoneNormalised is in format like "+61412345678"
                    let countryCode = '';
                    let nationalNumber = '';

                    if (phoneNormalised.startsWith('+')) {
                        // Extract country code (assume first 2-3 digits after +)
                        const phoneWithoutPlus = phoneNormalised.substring(1);

                        // Common country codes: 61 (AU), 1 (US/CA), 44 (UK), etc.
                        if (phoneWithoutPlus.startsWith('61')) {
                            countryCode = '61';
                            nationalNumber = phoneWithoutPlus.substring(2);
                        } else if (phoneWithoutPlus.startsWith('1')) {
                            countryCode = '1';
                            nationalNumber = phoneWithoutPlus.substring(1);
                        } else if (phoneWithoutPlus.startsWith('44')) {
                            countryCode = '44';
                            nationalNumber = phoneWithoutPlus.substring(2);
                        } else {
                            // Default: assume 2-digit country code
                            countryCode = phoneWithoutPlus.substring(0, 2);
                            nationalNumber = phoneWithoutPlus.substring(2);
                        }
                    } else {
                        // No + prefix, assume it's already national number
                        nationalNumber = phoneNormalised;
                        countryCode = '61'; // Default to Australia
                    }

                    knackApiPayloads.push({
                        field_3988: 'Phone',                    // Communication type
                        field_3886: phoneNormalised,            // Full international phone
                        field_3971: nationalNumber,             // National number (without country code)
                        field_3885: countryCode,                // Country code
                        field_3982: 'Company',                  // Entity type
                        field_3876: 'Active',                   // Status
                        field_3881: currentUserId,              // Created by (current user ID)
                        field_4016: tenantId                    // Tenant ID
                    });
                }

                console.log(`📦 Built knack_api_payloads from submitted form data (${knackApiPayloads.length} payloads)`);
                console.log('Payloads:', knackApiPayloads);

                // Get other values from pre-submission response or use defaults
                if (typeof window._isTest !== 'undefined') {
                    isTest = window._isTest;
                    console.log(`✅ Using is_test from pre-submission response: ${isTest}`);
                } else {
                    console.log(`⚠️ Using default is_test: ${isTest}`);
                }

                if (window._comActionType) {
                    comActionType = window._comActionType;
                    console.log(`✅ Using com_action_type from pre-submission response: ${comActionType}`);
                } else {
                    console.log(`⚠️ Using default com_action_type: ${comActionType}`);
                }

                if (window._sharedComIds) {
                    sharedComIds = window._sharedComIds;
                    console.log(`✅ Using shared_com_ids from pre-submission response: ${sharedComIds}`);
                }

                // Build base payload
                const payload = {
                    view: viewId,
                    form_type: formType,
                    timestamp: new Date().toISOString(),
                    company_id: companyId,
                    entity_id: companyId,
                    tenant_id: tenantId,
                    current_user: {
                        id: currentUserId,
                        email: currentUserEmail
                    },
                    ecn_record_id: ecnRecordId,
                    company_name_normalised: companyNameNormalised,
                    company_search: companySearch,
                    company_short_search: companyShortSearch,
                    street_address_search: streetAddressSearch,
                    formatted_street_address: formattedStreetAddress,
                    address_street: streetAddressRaw,
                    address_street2: street2Raw,
                    address_city: cityRaw,
                    address_state: stateRaw,
                    address_zip: zipRaw,
                    email_normalised: emailNormalised,
                    phone_normalised: phoneNormalised,
                    knack_api_payloads: knackApiPayloads.map(p => JSON.stringify(p)).join(':::'),
                    shared_com_ids: sharedComIds,
                    com_action_type: comActionType,
                    is_test: isTest,
                    is_post_submission: true,
                    data: {
                        form_type: formType,
                        company_name_normalised: companyNameNormalised,
                        company_search: companySearch,
                        company_short_search: companyShortSearch,
                        street_address_search: streetAddressSearch,
                        formatted_street_address: formattedStreetAddress,
                        address_street: streetAddressRaw,
                        address_street2: street2Raw,
                        address_city: cityRaw,
                        address_state: stateRaw,
                        address_zip: zipRaw,
                        email_normalised: emailNormalised,
                        phone_normalised: phoneNormalised,
                        tenant_id: tenantId
                    }
                };

                // Add update-specific fields ONLY for company-update forms
                if (formType === 'company-update') {
                    // Get existing record IDs from stored values (captured during form render)
                    // Hidden views are no longer in DOM after form submission/redirect
                    const existingRecordIds = window._existingRecordIds || {};
                    console.log(`📋 Using stored record IDs for post-submission:`, existingRecordIds);

                    // Add to top level
                    payload.company_record_id = existingRecordIds.company_record_id;
                    payload.primary_email_record_id = existingRecordIds.primary_email_record_id;
                    payload.primary_phone_record_id = existingRecordIds.primary_phone_record_id;
                    payload.primary_scn_record_id = existingRecordIds.primary_scn_record_id;
                    payload.original_values = originalFormValues;
                    payload.company_name_has_changed = finalChangeDetection.company_name_has_changed;
                    payload.company_short_name_has_changed = finalChangeDetection.company_short_name_has_changed;
                    payload.street_address_has_changed = finalChangeDetection.street_address_has_changed;
                    payload.email_has_changed = finalChangeDetection.email_has_changed;
                    payload.phone_has_changed = finalChangeDetection.phone_has_changed;
                    payload.email_was_deleted = finalChangeDetection.email_was_deleted;
                    payload.phone_was_deleted = finalChangeDetection.phone_was_deleted;

                    // Add to data object
                    payload.data.company_record_id = existingRecordIds.company_record_id;
                    payload.data.primary_email_record_id = existingRecordIds.primary_email_record_id;
                    payload.data.primary_phone_record_id = existingRecordIds.primary_phone_record_id;
                    payload.data.primary_scn_record_id = existingRecordIds.primary_scn_record_id;
                    payload.data.original_values = originalFormValues;
                    payload.data.company_name_has_changed = finalChangeDetection.company_name_has_changed;
                    payload.data.company_short_name_has_changed = finalChangeDetection.company_short_name_has_changed;
                    payload.data.street_address_has_changed = finalChangeDetection.street_address_has_changed;
                    payload.data.email_has_changed = finalChangeDetection.email_has_changed;
                    payload.data.phone_has_changed = finalChangeDetection.phone_has_changed;
                    payload.data.email_was_deleted = finalChangeDetection.email_was_deleted;
                    payload.data.phone_was_deleted = finalChangeDetection.phone_was_deleted;
                } else {
                    // For creation forms, these fields should be null
                    payload.company_record_id = null;
                    payload.primary_email_record_id = null;
                    payload.primary_phone_record_id = null;

                    payload.data.company_record_id = null;
                    payload.data.primary_email_record_id = null;
                    payload.data.primary_phone_record_id = null;
                }

                console.log(`📦 Built post-submission ${formType} payload:`, payload);
                return payload;
            },

            /**
             * Fire post-submission webhook
             */
            firePostSubmissionWebhook: function (viewId, submissionResponse) {
                const config = viewConfigs[viewId];

                if (!config || !config.postSubmissionWebhook || !config.postSubmissionWebhook.enabled) {
                    console.log(`🔗 Post-submission webhook not configured for ${viewId}`);
                    return;
                }

                const webhookUrl = config.postSubmissionWebhook.url;
                if (!webhookUrl || webhookUrl.includes('YOUR_POST_WEBHOOK_URL_HERE')) {
                    console.log(`⚠️ Post-submission webhook URL not configured for ${viewId}`);
                    return;
                }

                console.log(`🚀 Firing post-submission webhook for ${viewId}`);

                // Build the payload
                const payload = this.buildPostSubmissionPayload(viewId, submissionResponse);

                // Send the webhook
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                })
                    .then(response => response.json())
                    .then(result => {
                        console.log(`✅ Post-submission webhook fired successfully for ${viewId}`);
                        console.log(`📦 Post-submission webhook response:`, result);

                        // Extract ECN ID from webhook response
                        let ecnId = null;
                        if (result && result.ecn_id) {
                            ecnId = result.ecn_id;
                            console.log(`✅ Extracted ECN ID from webhook response: ${ecnId}`);
                        } else if (result && result.ecn_record_id) {
                            ecnId = result.ecn_record_id;
                            console.log(`✅ Extracted ECN ID from webhook response (ecn_record_id): ${ecnId}`);
                        }

                        // Redirect to Quick Create Contact form if we have ECN ID (company creation)
                        // Go to scene_2435 which has view_5685 (Quick Create Contact form)
                        if (ecnId && viewId === 'view_4059') {
                            // Store ECN ID for later use (e.g., redirecting to contact view after contact creation)
                            window._newCompanyEcnId = ecnId;
                            const redirectUrl = `#contacts6/add-contact-to-company2/`;
                            console.log(`🔀 Redirecting to Quick Create Contact form: ${redirectUrl}`);
                            window.location.hash = redirectUrl;
                        } else if (!ecnId) {
                            console.warn(`⚠️ No ECN ID in webhook response - cannot redirect`);
                        }
                    })
                    .catch(error => {
                        console.error(`❌ Post-submission webhook error for ${viewId}:`, error);
                    })
                    .finally(() => {
                        // Cleanup window variables
                        delete window._originalFormValues;
                        delete window._preSubmissionChangeDetection;
                        delete window._comActionType;
                        delete window._sharedComIds;
                        delete window._preSubmissionFormData;
                        delete window._companyId;
                        delete window._ecnRecordId;
                        delete window._isTest;
                        delete window._knackApiPayloads;
                        console.log(`🧹 Cleaned up post-submission variables`);
                    });
            }
        };

        // ========================================================================
        // CONTACT FORM HANDLER
        // Specialized handler for contact creation forms
        // ========================================================================
        const contactFormHandler = {

            /**
             * Normalize contact name for searching
             * Removes extra whitespace and converts to lowercase
             */
            normalizeContactName: function (name) {
                if (!name) return '';
                return name
                    .toLowerCase()
                    .replace(/\s+/g, ' ')
                    .trim();
            },

            /**
             * Normalize email for searching
             * Converts to lowercase and removes whitespace
             */
            normalizeEmail: function (email) {
                if (!email) return '';
                return email.toLowerCase().replace(/\s+/g, '').trim();
            },

            /**
             * Normalize phone/mobile for comparison
             * Removes all non-digit characters except leading +
             */
            normalizePhone: function (phone) {
                if (!phone) return '';
                const cleaned = phone.replace(/[^\d+]/g, '');
                return cleaned;
            },

            /**
             * Format Australian mobile number for display
             * Input: national number without country code (e.g., "412345678")
             * Output: formatted (e.g., "0412 345 678")
             */
            formatAustralianMobile: function (nationalNumber) {
                if (!nationalNumber) return '';
                // Strip any non-digits
                let digits = nationalNumber.replace(/\D/g, '');
                // Add leading 0 if not present
                if (!digits.startsWith('0')) {
                    digits = '0' + digits;
                }
                // Format as 0XXX XXX XXX (mobile format)
                if (digits.length === 10) {
                    return `${digits.substring(0, 4)} ${digits.substring(4, 7)} ${digits.substring(7)}`;
                }
                // Return with leading 0 if wrong length
                return digits;
            },

            /**
             * Format Australian landline number for display
             * Input: national number without country code (e.g., "296564651")
             * Output: formatted (e.g., "02 9656 4651")
             */
            formatAustralianPhone: function (nationalNumber) {
                if (!nationalNumber) return '';
                // Strip any non-digits
                let digits = nationalNumber.replace(/\D/g, '');
                // Add leading 0 if not present
                if (!digits.startsWith('0')) {
                    digits = '0' + digits;
                }
                // Format as 0X XXXX XXXX (landline format)
                if (digits.length === 10) {
                    return `${digits.substring(0, 2)} ${digits.substring(2, 6)} ${digits.substring(6)}`;
                }
                // Handle 1300/1800 numbers (format: 1300 XXX XXX)
                if (digits.startsWith('1300') || digits.startsWith('1800')) {
                    if (digits.length === 10) {
                        return `${digits.substring(0, 4)} ${digits.substring(4, 7)} ${digits.substring(7)}`;
                    }
                }
                // Return with leading 0 if wrong length
                return digits;
            },

            /**
             * Build payload for contact creation and update forms
             * This is called BEFORE form submission for duplicate checking
             */
            buildPreSubmissionPayload: function (viewId, formData) {
                const config = viewConfigs[viewId];
                const formType = config.formType; // 'contact-creation' or 'contact-update'
                const isUpdateForm = formType === 'contact-update';

                console.log(`👤 Building ${formType} payload for ${viewId}`);

                // Get current user
                let currentUserId = null;
                let currentUserEmail = null;
                try {
                    if (Knack && Knack.getUserAttributes) {
                        const userAttrs = Knack.getUserAttributes();
                        currentUserId = userAttrs.id || null;
                        currentUserEmail = userAttrs.email || null;
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not get current user info:`, error);
                }

                // Get tenant_id from hidden view
                // - Create Contact: view_5623 contains field_3925
                // - Create Contact with Company: view_5633 may contain field_3925
                // - Update Contact: view_5629 contains field_3925
                let tenantId = '';
                let tenantViewId = 'view_5623';  // Default for create forms
                if (isUpdateForm) {
                    tenantViewId = 'view_5629';
                } else if (viewId === 'view_5631') {
                    // Create Contact with Company - try view_5633 first, fallback to view_5623
                    tenantViewId = 'view_5633';
                }
                try {
                    // The value is in a span with data-kn="connection-value" inside .field_3925
                    const tenantField = $(`#${tenantViewId} .field_3925 [data-kn="connection-value"]`);
                    if (tenantField.length > 0) {
                        tenantId = tenantField.text().trim();
                    }
                    // Fallback: try .kn-detail-body span
                    if (!tenantId) {
                        const altField = $(`#${tenantViewId} .field_3925 .kn-detail-body span`);
                        if (altField.length > 0) {
                            tenantId = altField.text().trim();
                        }
                    }
                    // Second fallback: try .kn-detail-body directly
                    if (!tenantId) {
                        const altField2 = $(`#${tenantViewId} .field_3925 .kn-detail-body`);
                        if (altField2.length > 0) {
                            tenantId = altField2.text().trim();
                        }
                    }
                    // For view_5631, if tenant_id not found in view_5633, try view_5623
                    if (!tenantId && viewId === 'view_5631') {
                        const altTenantField = $(`#view_5623 .field_3925 .kn-detail-body`);
                        if (altTenantField.length > 0) {
                            tenantId = altTenantField.text().trim();
                            console.log(`🏢 Tenant ID fallback from view_5623: "${tenantId}"`);
                        }
                    }
                    console.log(`🏢 Tenant ID from hidden view (${tenantViewId}): "${tenantId}"`);
                } catch (error) {
                    console.warn(`⚠️ Could not get tenant_id from hidden view:`, error);
                }

                // For Create Contact with Company (view_5631) or Quick Create (view_5685), get parent_record_id (company_id)
                let companyId = '';
                if (viewId === 'view_5631' || viewId === 'view_5685') {
                    try {
                        // For view_5685, get from field_4358 (hidden text field)
                        if (viewId === 'view_5685') {
                            const $parentField = $('#field_4358');
                            if ($parentField.length > 0) {
                                companyId = $parentField.val().trim();
                                console.log(`🏢 Company ID from field_4358: "${companyId}"`);
                            }
                        }

                        // For view_5631, get from hidden view
                        if (!companyId && viewId === 'view_5631') {
                            const companyIdSelector = config.hiddenView?.recordIds?.parent_record_id;
                            if (companyIdSelector) {
                                const $companyIdField = $(companyIdSelector);
                                if ($companyIdField.length > 0) {
                                    companyId = $companyIdField.text().trim();
                                    console.log(`🏢 Company ID from hidden view (view_5633): "${companyId}"`);
                                }
                            }
                        }

                        // Fallback: try window._parentRecordId if set during render
                        if (!companyId && window._parentRecordId) {
                            companyId = window._parentRecordId;
                            console.log(`🏢 Company ID from window._parentRecordId: "${companyId}"`);
                        }
                    } catch (error) {
                        console.warn(`⚠️ Could not get company_id:`, error);
                    }
                }

                // For update forms, extract ecn_record_id from URL
                // URL format: .../view-contact3/{ecn_record_id}/update-contact/{ecn_record_id}/
                let ecnRecordId = '';
                if (isUpdateForm) {
                    try {
                        const hash = window.location.hash || '';
                        // Extract the ID from the URL - it appears after view-contact3/ or as the last slug
                        const hashParts = hash.split('/').filter(part => part && part !== '#');
                        // Look for the ECN record ID (24-character hex string)
                        for (const part of hashParts) {
                            // Knack record IDs are 24-character hex strings
                            if (/^[a-f0-9]{24}$/i.test(part)) {
                                ecnRecordId = part;
                                break;  // Take the first one (should be the ECN ID)
                            }
                        }
                        console.log(`🔗 ECN Record ID from URL: "${ecnRecordId}"`);
                    } catch (error) {
                        console.warn(`⚠️ Could not extract ecn_record_id from URL:`, error);
                    }

                    // Also try to get parent_record_id from hidden view (view_5630)
                    // This is the ENT record ID for the parent company
                    let parentRecordId = '';
                    try {
                        const parentField = $('#view_5630 .field_4135 .kn-detail-body');
                        if (parentField.length > 0) {
                            parentRecordId = parentField.text().trim();
                        }
                        console.log(`🏢 Parent Record ID from view_5630: "${parentRecordId}"`);
                    } catch (error) {
                        console.warn(`⚠️ Could not get parent_record_id from hidden view:`, error);
                    }

                    // Store for later use in payload
                    window._ecnRecordId = ecnRecordId;
                    window._parentRecordId = parentRecordId;
                }

                // Extract form field values using config selectors
                const fields = config.fields;

                // Name (composite field)
                let firstName = '';
                let lastName = '';
                if (fields.field_3860 && fields.field_3860.selectors) {
                    firstName = $(fields.field_3860.selectors.first).val() || '';
                    lastName = $(fields.field_3860.selectors.last).val() || '';
                }

                // Preferred name
                const preferredName = fields.field_3861 ? $(fields.field_3861.selector).val() || '' : '';

                // Email
                const emailRaw = fields.field_4164 ? $(fields.field_4164.selector).val() || '' : '';

                // Mobile
                const mobileRaw = fields.field_4165 ? $(fields.field_4165.selector).val() || '' : '';

                // Phone
                const phoneRaw = fields.field_4056 ? $(fields.field_4056.selector).val() || '' : '';

                // Normalize all fields
                const firstNameNormalised = firstName.trim();
                const lastNameNormalised = lastName.trim();
                const fullName = (firstNameNormalised + ' ' + lastNameNormalised).trim();
                const firstNameSearch = this.normalizeContactName(firstName);
                const lastNameSearch = this.normalizeContactName(lastName);
                const fullNameSearch = this.normalizeContactName(fullName);
                const emailNormalised = this.normalizeEmail(emailRaw);
                const mobileNormalised = this.normalizePhone(mobileRaw);
                const phoneNormalised = this.normalizePhone(phoneRaw);

                // For update forms, calculate change detection flags
                let changeDetection = {};
                if (isUpdateForm) {
                    const originalValues = this.getOriginalValues(viewId);
                    const recordIds = this.getExistingRecordIds(viewId);

                    // Normalize original values for comparison
                    const origFirstName = (originalValues.first_name || '').trim();
                    const origLastName = (originalValues.last_name || '').trim();
                    const origPreferredName = (originalValues.preferred_name || '').trim();
                    const origEmail = this.normalizeEmail(originalValues.email || '');
                    const origMobile = this.normalizePhone(originalValues.mobile || '');
                    const origPhone = this.normalizePhone(originalValues.phone || '');

                    // Determine what changed
                    const nameChanged = (firstNameNormalised !== origFirstName) || (lastNameNormalised !== origLastName);
                    const preferredNameChanged = preferredName.trim() !== origPreferredName;
                    const emailChanged = emailNormalised !== origEmail;
                    const mobileChanged = mobileNormalised !== origMobile;
                    const phoneChanged = phoneNormalised !== origPhone;

                    changeDetection = {
                        name_has_changed: nameChanged,
                        preferred_name_has_changed: preferredNameChanged,
                        email_has_changed: emailChanged,
                        mobile_has_changed: mobileChanged,
                        phone_has_changed: phoneChanged,
                        original_values: {
                            first_name: origFirstName,
                            last_name: origLastName,
                            preferred_name: origPreferredName,
                            email: origEmail,
                            mobile: origMobile,
                            phone: origPhone
                        },
                        record_ids: recordIds
                    };

                    // Store for post-submission webhook
                    window._preSubmissionChangeDetection = changeDetection;

                    console.log(`📊 Change detection for ${viewId}:`, changeDetection);
                }

                // Build payload
                const payload = {
                    view: viewId,
                    form_type: formType,
                    allow_shared_contacts: config.allowSharedContacts !== false,  // Default true if not specified
                    timestamp: new Date().toISOString(),
                    tenant_id: tenantId,
                    current_user: {
                        id: currentUserId,
                        email: currentUserEmail
                    },
                    first_name: firstNameNormalised,
                    last_name: lastNameNormalised,
                    full_name: fullName,
                    first_name_search: firstNameSearch,
                    last_name_search: lastNameSearch,
                    full_name_search: fullNameSearch,
                    preferred_name: preferredName.trim(),
                    email_normalised: emailNormalised,
                    mobile_normalised: mobileNormalised,
                    phone_normalised: phoneNormalised,
                    data: {
                        form_type: formType,
                        allow_shared_contacts: config.allowSharedContacts !== false,
                        first_name: firstNameNormalised,
                        last_name: lastNameNormalised,
                        full_name: fullName,
                        first_name_search: firstNameSearch,
                        last_name_search: lastNameSearch,
                        full_name_search: fullNameSearch,
                        preferred_name: preferredName.trim(),
                        email: emailNormalised,
                        mobile: mobileNormalised,
                        phone: phoneNormalised,
                        tenant_id: tenantId
                    }
                };

                // Add change detection and record IDs for update forms
                if (isUpdateForm) {
                    payload.change_detection = changeDetection;
                    payload.data.change_detection = changeDetection;

                    // Add ECN record ID (from URL) and parent record ID (ENT ID for email sharing check)
                    payload.ecn_record_id = ecnRecordId || window._ecnRecordId || '';
                    payload.ent_record_id = window._parentRecordId || '';  // Parent company ENT ID
                    payload.data.ecn_record_id = payload.ecn_record_id;
                    payload.data.ent_record_id = payload.ent_record_id;

                    // Get connection_type from hidden view (view_5630)
                    let connectionType = '';
                    try {
                        const $connectionTypeField = $('#view_5630 .field_3852 .kn-detail-body');
                        if ($connectionTypeField.length > 0) {
                            connectionType = $connectionTypeField.text().trim();
                        }
                    } catch (error) {
                        console.warn(`⚠️ Could not get connection_type from hidden view:`, error);
                    }
                    payload.connection_type = connectionType;
                    payload.data.connection_type = connectionType;

                    console.log(`🔗 Added update form IDs - ECN: "${payload.ecn_record_id}", ENT: "${payload.ent_record_id}", Connection Type: "${connectionType}"`);
                }

                // Add company_id for Create Contact with Company form (view_5631 or view_5685)
                if ((viewId === 'view_5631' || viewId === 'view_5685') && companyId) {
                    payload.company_id = companyId;
                    payload.parent_record_id = companyId;  // Also include as parent_record_id for clarity
                    payload.data.company_id = companyId;
                    payload.data.parent_record_id = companyId;
                    console.log(`🏢 Added company_id to payload: "${companyId}"`);
                }

                console.log(`📦 Built ${formType} payload:`, payload);
                return payload;
            },

            /**
             * Build post-submission payload for contact forms
             * This is called AFTER form submission completes
             * Uses on-form values (captured at submission time) as user may have resolved conflicts
             */
            buildPostSubmissionPayload: function (viewId, submissionResponse) {
                const config = viewConfigs[viewId];
                const formType = config.formType;

                console.log(`👤 Building post-submission payload for ${formType} (${viewId})`);

                // Get current user
                let currentUserId = null;
                let currentUserEmail = null;
                try {
                    if (Knack && Knack.getUserAttributes) {
                        const userAttrs = Knack.getUserAttributes();
                        currentUserId = userAttrs.id || null;
                        currentUserEmail = userAttrs.email || null;
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not get current user info:`, error);
                }

                // Extract contact_id (ENT record ID) from submission response
                let contactId = null;
                try {
                    if (submissionResponse && submissionResponse.id) {
                        contactId = submissionResponse.id;
                        console.log(`✅ Extracted contact_id from submission response.id: ${contactId}`);
                    } else if (submissionResponse && submissionResponse.record && submissionResponse.record.id) {
                        contactId = submissionResponse.record.id;
                        console.log(`✅ Extracted contact_id from submission response.record.id: ${contactId}`);
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not extract contact_id from submission:`, error);
                }

                // Get tenant_id from hidden view (view_5623 contains field_3925)
                let tenantId = '';
                try {
                    // The value is in a span with data-kn="connection-value" inside .field_3925
                    const tenantField = $('#view_5623 .field_3925 [data-kn="connection-value"]');
                    if (tenantField.length > 0) {
                        tenantId = tenantField.text().trim();
                    }
                    // Fallback: try .kn-detail-body span
                    if (!tenantId) {
                        const altField = $('#view_5623 .field_3925 .kn-detail-body span');
                        if (altField.length > 0) {
                            tenantId = altField.text().trim();
                        }
                    }
                    console.log(`🏢 Tenant ID from hidden view (view_5623): "${tenantId}"`);
                } catch (error) {
                    console.warn(`⚠️ Could not get tenant_id from hidden view:`, error);
                }

                // Get stored form data (captured at submission time - reflects user's final on-form values)
                // This is important because user may have resolved conflicts by deleting values
                const storedFormData = window._preSubmissionFormData || {};
                console.log(`📂 Using stored form data for post-submission:`, storedFormData);

                // Extract name fields
                const firstName = storedFormData.field_3860 ? storedFormData.field_3860.first || '' : '';
                const lastName = storedFormData.field_3860 ? storedFormData.field_3860.last || '' : '';
                const preferredName = storedFormData.field_3861 || '';

                // Extract contact info - use contact_info object or individual field values
                const emailRaw = storedFormData.contact_info ? storedFormData.contact_info.email : (storedFormData.field_4164 || '');
                const mobileRaw = storedFormData.contact_info ? storedFormData.contact_info.mobile : (storedFormData.field_4165 || '');
                const phoneRaw = storedFormData.contact_info ? storedFormData.contact_info.phone : (storedFormData.field_4056 || '');

                // Normalize communication values
                const emailNormalised = this.normalizeEmail(emailRaw);
                const mobileNormalised = this.normalizePhone(mobileRaw);
                const phoneNormalised = this.normalizePhone(phoneRaw);

                // Build knack_api_payloads for communication channels
                const knackApiPayloads = [];

                const emailHasValue = emailNormalised && emailNormalised.trim() !== '';
                const mobileHasValue = mobileNormalised && mobileNormalised.trim() !== '';
                const phoneHasValue = phoneNormalised && phoneNormalised.trim() !== '';

                // For update forms, check if each field has changed (based on final values)
                const isContactUpdateForm = formType === 'contact-update';
                let emailChanged = true;  // Default true for create forms
                let mobileChanged = true;
                let phoneChanged = true;

                if (isContactUpdateForm) {
                    const originalValues = window._originalFormValues || {};
                    const origEmail = this.normalizeEmail(originalValues.email || '');
                    const origMobile = this.normalizePhone(originalValues.mobile || '');
                    const origPhone = this.normalizePhone(originalValues.phone || '');

                    emailChanged = emailNormalised !== origEmail;
                    mobileChanged = mobileNormalised !== origMobile;
                    phoneChanged = phoneNormalised !== origPhone;

                    console.log(`📊 COM change detection for update form:`);
                    console.log(`   Email: "${origEmail}" → "${emailNormalised}" (changed: ${emailChanged})`);
                    console.log(`   Mobile: "${origMobile}" → "${mobileNormalised}" (changed: ${mobileChanged})`);
                    console.log(`   Phone: "${origPhone}" → "${phoneNormalised}" (changed: ${phoneChanged})`);
                }

                // Build email payload if email has value AND (is create form OR has changed)
                if (emailHasValue && (!isContactUpdateForm || emailChanged)) {
                    const emailParts = emailNormalised.split('@');
                    const emailLocal = emailParts[0] || '';
                    const emailDomain = emailParts[1] || '';

                    knackApiPayloads.push({
                        field_3988: 'Email',                    // Communication type
                        field_3869: emailNormalised,            // Email normalized (lowercase for search)
                        field_3968: emailRaw,                   // Email formatted (original as entered)
                        field_3969: emailDomain,                // Domain
                        field_3970: emailLocal.charAt(0).toUpperCase() + emailLocal.slice(1), // Contact name
                        field_3982: 'Personal',                 // Entity type (Personal for contacts)
                        field_3876: 'Active',                   // Status
                        field_3881: currentUserId,              // Created by (current user ID)
                        field_4016: tenantId                    // Tenant ID
                    });
                }

                // Build mobile payload if mobile has value AND (is create form OR has changed)
                if (mobileHasValue && (!isContactUpdateForm || mobileChanged)) {
                    // Extract country code and national number
                    let countryCode = '61';  // Default to Australia
                    let nationalNumber = mobileNormalised;

                    if (mobileNormalised.startsWith('+')) {
                        const phoneWithoutPlus = mobileNormalised.substring(1);
                        if (phoneWithoutPlus.startsWith('61')) {
                            countryCode = '61';
                            nationalNumber = phoneWithoutPlus.substring(2);
                        } else if (phoneWithoutPlus.startsWith('1')) {
                            countryCode = '1';
                            nationalNumber = phoneWithoutPlus.substring(1);
                        } else if (phoneWithoutPlus.startsWith('44')) {
                            countryCode = '44';
                            nationalNumber = phoneWithoutPlus.substring(2);
                        } else {
                            countryCode = phoneWithoutPlus.substring(0, 2);
                            nationalNumber = phoneWithoutPlus.substring(2);
                        }
                    }

                    // Format mobile for display (Australian format: 0412 345 678)
                    const mobileFormatted = this.formatAustralianMobile(nationalNumber);

                    knackApiPayloads.push({
                        field_3988: 'Mobile',                   // Communication type
                        field_3975: mobileNormalised,           // mobile_normalised_text (full international)
                        field_3976: mobileFormatted,            // mobile_formatted_text (display format)
                        field_3977: `+${countryCode}`,          // mobile_country_code_text
                        field_3982: 'Personal',                 // Entity type (Personal for contacts)
                        field_3876: 'Active',                   // Status
                        field_3881: currentUserId,              // Created by (current user ID)
                        field_4016: tenantId                    // Tenant ID
                    });
                }

                // Build phone payload if phone has value AND (is create form OR has changed) AND user hasn't confirmed sharing
                // When window._phoneIsShared is true, we link to existing COM instead of creating new one
                if (phoneHasValue && (!isContactUpdateForm || phoneChanged) && !window._phoneIsShared) {
                    // Extract country code and national number
                    let countryCode = '61';  // Default to Australia
                    let nationalNumber = phoneNormalised;

                    if (phoneNormalised.startsWith('+')) {
                        const phoneWithoutPlus = phoneNormalised.substring(1);
                        if (phoneWithoutPlus.startsWith('61')) {
                            countryCode = '61';
                            nationalNumber = phoneWithoutPlus.substring(2);
                        } else if (phoneWithoutPlus.startsWith('1')) {
                            countryCode = '1';
                            nationalNumber = phoneWithoutPlus.substring(1);
                        } else if (phoneWithoutPlus.startsWith('44')) {
                            countryCode = '44';
                            nationalNumber = phoneWithoutPlus.substring(2);
                        } else {
                            countryCode = phoneWithoutPlus.substring(0, 2);
                            nationalNumber = phoneWithoutPlus.substring(2);
                        }
                    }

                    // Format phone for display (Australian format: 02 9656 4651)
                    const phoneFormatted = this.formatAustralianPhone(nationalNumber);

                    knackApiPayloads.push({
                        field_3988: 'Phone',                    // Communication type
                        field_3886: phoneNormalised,            // phone_number_normalised_text (full international)
                        field_3971: phoneFormatted,             // phone_number_formatted_text (display format)
                        field_3885: countryCode,                // phone_number_country_code_text
                        field_3982: 'Personal',                 // Entity type (Personal for contacts)
                        field_3876: 'Active',                   // Status
                        field_3881: currentUserId,              // Created by (current user ID)
                        field_4016: tenantId                    // Tenant ID
                    });
                } else if (phoneHasValue && window._phoneIsShared) {
                    console.log(`📞 Phone is shared - skipping COM creation, will link to existing COM instead`);
                }

                console.log(`📦 Built knack_api_payloads from form data (${knackApiPayloads.length} payloads)`);
                console.log('Payloads:', knackApiPayloads);

                // Get action type and shared IDs from pre-submission webhook response
                const comActionType = window._comActionType || 'create_all';
                const sharedComIds = window._sharedComIds || '';
                const isTest = window._isTest || false;

                // Get shared phone COM IDs (from phone sharing confirmation UI)
                // Only include if phone field still has a value at submission time
                const sharedPhoneComIds = window._sharedPhoneComIds || [];
                const phoneIsShared = window._phoneIsShared || false;

                // Build shared_com_ids only from actual on-form state
                // If user confirmed sharing but then cleared the phone field, don't include the COM ID
                let finalSharedComIdsList = [];

                // Add any existing shared COM IDs from pre-submission response
                if (sharedComIds) {
                    finalSharedComIdsList = sharedComIds.split(',').filter(id => id);
                }

                // Only add phone COM IDs if phone field still has a value AND user confirmed sharing
                if (phoneIsShared && phoneHasValue && sharedPhoneComIds.length > 0) {
                    finalSharedComIdsList = [...finalSharedComIdsList, ...sharedPhoneComIds];
                    console.log(`📞 Phone is shared and has value - including COM IDs: ${sharedPhoneComIds.join(',')}`);
                } else if (phoneIsShared && !phoneHasValue) {
                    console.log(`📞 Phone was marked as shared but field is now empty - NOT including COM IDs`);
                }

                const finalSharedComIds = finalSharedComIdsList.join(',');
                console.log(`🔗 Final shared_com_ids: "${finalSharedComIds}"`);

                // Build full name as it appears in the data (First Last)
                const fullName = (firstName + ' ' + lastName).trim();

                // For update forms, calculate change detection based on FINAL submitted values
                // This is important because user may have resolved conflicts by deleting values
                const isUpdateForm = formType === 'contact-update';
                let postSubmissionChangeDetection = {};

                if (isUpdateForm) {
                    // Get original values that were captured when form loaded
                    const originalValues = window._originalFormValues || {};

                    // Normalize original values for comparison
                    const origFirstName = (originalValues.first_name || '').trim();
                    const origLastName = (originalValues.last_name || '').trim();
                    const origPreferredName = (originalValues.preferred_name || '').trim();
                    const origEmail = this.normalizeEmail(originalValues.email || '');
                    const origMobile = this.normalizePhone(originalValues.mobile || '');
                    const origPhone = this.normalizePhone(originalValues.phone || '');

                    // Compare FINAL submitted values (post-conflict resolution) against originals
                    const nameChanged = (firstName.trim() !== origFirstName) || (lastName.trim() !== origLastName);
                    const preferredNameChanged = preferredName.trim() !== origPreferredName;
                    const emailChanged = emailNormalised !== origEmail;
                    const mobileChanged = mobileNormalised !== origMobile;
                    const phoneChanged = phoneNormalised !== origPhone;

                    postSubmissionChangeDetection = {
                        name_has_changed: nameChanged,
                        preferred_name_has_changed: preferredNameChanged,
                        email_has_changed: emailChanged,
                        mobile_has_changed: mobileChanged,
                        phone_has_changed: phoneChanged,
                        original_values: {
                            first_name: origFirstName,
                            last_name: origLastName,
                            preferred_name: origPreferredName,
                            email: origEmail,
                            mobile: origMobile,
                            phone: origPhone
                        },
                        final_values: {
                            first_name: firstName.trim(),
                            last_name: lastName.trim(),
                            preferred_name: preferredName.trim(),
                            email: emailNormalised,
                            mobile: mobileNormalised,
                            phone: phoneNormalised
                        }
                    };

                    console.log(`📊 Post-submission change detection for ${viewId}:`, postSubmissionChangeDetection);
                }

                // Build payload
                const payload = {
                    view: viewId,
                    form_type: formType,
                    timestamp: new Date().toISOString(),
                    tenant_id: tenantId,
                    current_user: {
                        id: currentUserId,
                        email: currentUserEmail
                    },
                    contact_id: contactId,
                    entity_id: contactId,
                    first_name: firstName,
                    last_name: lastName,
                    full_name: fullName,
                    first_name_search: this.normalizeContactName(firstName),
                    last_name_search: this.normalizeContactName(lastName),
                    full_name_search: this.normalizeContactName(fullName),
                    preferred_name: preferredName,
                    email_normalised: emailNormalised,
                    mobile_normalised: mobileNormalised,
                    phone_normalised: phoneNormalised,
                    knack_api_payloads: knackApiPayloads.map(p => JSON.stringify(p)).join(':::'),
                    com_action_type: comActionType,
                    shared_com_ids: finalSharedComIds,  // Combined: pre-submission shared IDs + phone sharing COM IDs
                    phone_is_shared: phoneIsShared,
                    is_test: isTest,
                    is_post_submission: true,
                    data: {
                        form_type: formType,
                        tenant_id: tenantId,
                        first_name: firstName,
                        last_name: lastName,
                        full_name: fullName,
                        first_name_search: this.normalizeContactName(firstName),
                        last_name_search: this.normalizeContactName(lastName),
                        full_name_search: this.normalizeContactName(fullName),
                        preferred_name: preferredName,
                        email_normalised: emailNormalised,
                        mobile_normalised: mobileNormalised,
                        phone_normalised: phoneNormalised
                    }
                };

                // Add change detection and record IDs for update forms
                if (isUpdateForm) {
                    payload.change_detection = postSubmissionChangeDetection;
                    payload.data.change_detection = postSubmissionChangeDetection;

                    // Get record IDs from hidden view (captured at form render)
                    const recordIds = window._existingRecordIds || this.getExistingRecordIds(viewId);

                    // Add record IDs to payload
                    payload.record_ids = recordIds;
                    payload.parent_record_id = recordIds.parent_record_id || '';
                    payload.ecn_record_id = recordIds.ecn_record_id || '';
                    payload.primary_email_record_id = recordIds.primary_email_record_id || '';
                    payload.primary_mobile_record_id = recordIds.primary_mobile_record_id || '';
                    payload.primary_phone_record_id = recordIds.primary_phone_record_id || '';
                    payload.primary_scn_record_id = recordIds.primary_scn_record_id || '';
                    payload.connection_type = recordIds.connection_type || '';

                    // Also add to data object
                    payload.data.record_ids = recordIds;
                    payload.data.connection_type = recordIds.connection_type || '';

                    console.log(`🆔 Added record IDs to post-submission payload:`, recordIds);
                }

                // Add company_id for Create Contact with Company form (view_5631 or view_5685)
                if (viewId === 'view_5631' || viewId === 'view_5685') {
                    // Get company_id from window._parentRecordId (set during render)
                    // or from hidden view config (view_5631) or form field (view_5685)
                    let companyId = window._parentRecordId || '';

                    // For view_5685, try to get from field_4358
                    if (!companyId && viewId === 'view_5685') {
                        const $parentField = $('#field_4358');
                        if ($parentField.length > 0) {
                            companyId = $parentField.val().trim();
                            console.log(`🏢 Got company_id from field_4358: "${companyId}"`);
                        }
                    }

                    // For view_5631, fallback to hidden view
                    if (!companyId && viewId === 'view_5631' && config.hiddenView && config.hiddenView.recordIds) {
                        const companyIdSelector = config.hiddenView.recordIds.parent_record_id;
                        if (companyIdSelector) {
                            const $companyIdField = $(companyIdSelector);
                            if ($companyIdField.length > 0) {
                                companyId = $companyIdField.text().trim();
                            }
                        }
                    }
                    if (companyId) {
                        payload.company_id = companyId;
                        payload.parent_record_id = companyId;
                        payload.data.company_id = companyId;
                        payload.data.parent_record_id = companyId;
                        console.log(`🏢 Added company_id to post-submission payload: "${companyId}"`);
                    }
                }

                console.log(`📦 Built post-submission ${formType} payload:`, payload);
                return payload;
            },

            /**
             * Get original values from hidden view for Update Contact form
             * Used for change detection to determine if revalidation is needed
             */
            getOriginalValues: function (viewId) {
                const config = viewConfigs[viewId];
                if (!config || !config.hiddenView || !config.hiddenView.originalValues) {
                    console.log(`⚠️ No hidden view configured for ${viewId}`);
                    return {};
                }

                const selectors = config.hiddenView.originalValues;
                const originalValues = {};

                // Extract values using configured selectors
                Object.keys(selectors).forEach(key => {
                    const selector = selectors[key];
                    const $el = $(selector);
                    if ($el.length > 0) {
                        originalValues[key] = $el.text().trim();
                    } else {
                        originalValues[key] = '';
                    }
                });

                console.log(`📋 Original values from hidden view for ${viewId}:`, originalValues);
                return originalValues;
            },

            /**
             * Get existing record IDs from hidden view for Update Contact form
             * Used for webhook payloads to reference existing records
             */
            getExistingRecordIds: function (viewId) {
                const config = viewConfigs[viewId];
                if (!config || !config.hiddenView || !config.hiddenView.recordIds) {
                    console.log(`⚠️ No record IDs configured for ${viewId}`);
                    return {};
                }

                const selectors = config.hiddenView.recordIds;
                const recordIds = {};

                // Extract record IDs using configured selectors
                Object.keys(selectors).forEach(key => {
                    const selector = selectors[key];
                    const $el = $(selector);
                    if ($el.length > 0) {
                        recordIds[key] = $el.text().trim();
                    } else {
                        recordIds[key] = '';
                    }
                });

                console.log(`🆔 Record IDs from hidden view for ${viewId}:`, recordIds);
                return recordIds;
            },

            /**
             * Fire post-submission webhook for contact forms
             * @param {string} viewId - The view ID
             * @param {object} submissionResponse - The Knack submission response
             * @param {object} callbacks - Optional callbacks: { onSuccess: fn(result), onError: fn(error) }
             */
            firePostSubmissionWebhook: function (viewId, submissionResponse, callbacks = {}) {
                const config = viewConfigs[viewId];

                if (!config || !config.postSubmissionWebhook || !config.postSubmissionWebhook.enabled) {
                    console.log(`🔗 Post-submission webhook not configured for ${viewId}`);
                    if (callbacks.onError) callbacks.onError(new Error('Webhook not configured'));
                    return;
                }

                const webhookUrl = config.postSubmissionWebhook.url;
                if (!webhookUrl || webhookUrl.includes('YOUR_CONTACT_POST_WEBHOOK_URL_HERE')) {
                    console.log(`⚠️ Post-submission webhook URL not configured for ${viewId}`);
                    if (callbacks.onError) callbacks.onError(new Error('Webhook URL not configured'));
                    return;
                }

                console.log(`🚀 Firing post-submission webhook for ${viewId}`);

                const payload = this.buildPostSubmissionPayload(viewId, submissionResponse);

                fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                })
                    .then(response => response.json())
                    .then(result => {
                        console.log(`✅ Post-submission webhook fired successfully for ${viewId}`);
                        console.log(`📦 Post-submission webhook response:`, result);

                        // Extract ECN ID from webhook response for redirect
                        let ecnId = null;
                        if (result && result.ecn_id) {
                            ecnId = result.ecn_id;
                        } else if (result && result.ecn_record_id) {
                            ecnId = result.ecn_record_id;
                        }

                        // Redirect to contact view if we have ECN ID (only for standalone contact creation)
                        if (ecnId && viewId === 'view_5612') {
                            const redirectUrl = `#contacts6/view-contact3/${ecnId}`;
                            console.log(`🔀 Redirecting to contact view: ${redirectUrl}`);
                            window.location.hash = redirectUrl;
                        }

                        // Call success callback if provided
                        if (callbacks.onSuccess) {
                            callbacks.onSuccess(result);
                        }
                    })
                    .catch(error => {
                        console.error(`❌ Post-submission webhook error for ${viewId}:`, error);
                        if (callbacks.onError) {
                            callbacks.onError(error);
                        }
                    })
                    .finally(() => {
                        // Cleanup window variables
                        delete window._preSubmissionFormData;
                        delete window._comActionType;
                        delete window._sharedComIds;
                        delete window._isTest;
                        // Cleanup phone sharing variables
                        delete window._phoneIsShared;
                        delete window._sharedPhoneComIds;
                        console.log(`🧹 Cleaned up post-submission variables for contact form`);
                    });
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

                // Check for placeholder URL
                if (config.webhook.url.includes('YOUR_WEBHOOK_URL_HERE')) {
                    console.error(`❌ Webhook URL is still a placeholder for ${viewId}. Please update the webhook URL in viewConfigs.`);
                    return Promise.reject('Webhook URL not configured - please contact system administrator');
                }

                // Check form type and use appropriate handler
                const isCompanyForm = (config.formType === 'company-creation' || config.formType === 'company-update');
                const isContactForm = (config.formType === 'contact-creation' || config.formType === 'contact-update');

                let payload;

                if (isCompanyForm) {
                    // Use company-specific payload builder
                    console.log(`🏢 Detected company form: ${config.formType}`);
                    payload = companyFormHandler.buildPreSubmissionPayload(viewId, formData);
                } else if (isContactForm) {
                    // Use contact-specific payload builder
                    console.log(`👤 Detected contact form: ${config.formType}`);
                    payload = contactFormHandler.buildPreSubmissionPayload(viewId, formData);
                } else {
                    // Use generic payload (for other forms)
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

                    // Extract company_id from URL hash (for non-company forms that might need it)
                    let companyId = null;
                    try {
                        const hash = window.location.hash;
                        if (hash) {
                            const segments = hash.replace(/^#/, '').split('/');
                            if (segments.length >= 3 && segments[2]) {
                                companyId = segments[2];
                                console.log(`🏢 Extracted company_id from URL: ${companyId}`);
                            }
                        }
                    } catch (error) {
                        console.warn(`⚠️ Could not extract company_id from URL:`, error);
                    }

                    payload = {
                        view: viewId,
                        timestamp: new Date().toISOString(),
                        company_id: companyId,
                        current_user: {
                            id: currentUserId,
                            email: currentUserEmail
                        },
                        formData: formData
                    };
                }

                // Check for local API mode - use localhost instead of Make.com
                let webhookUrl = config.webhook.url;
                const useLocalApi = localStorage.getItem('Greenl_56ea_dev') !== null;

                if (useLocalApi && config.formType === 'company-creation') {
                    webhookUrl = 'http://localhost:3001/api/company/validate';
                    console.log(`🧪 LOCAL DEV MODE: Using ${webhookUrl} instead of Vercel`);
                }

                console.log(`🔗 Firing webhook with duplicate check for ${viewId} to ${webhookUrl}`, payload);

                return fetch(webhookUrl, {
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
                            let result = JSON.parse(responseText);
                            console.log(`✅ Parsed webhook response (initial):`, result);

                            // Handle Make.com wrapped response: [{ body: "...", status: 200 }]
                            if (Array.isArray(result) && result.length > 0 && result[0].body) {
                                console.log(`🔄 Detected Make.com wrapped response - extracting body`);
                                const bodyContent = result[0].body;

                                // Parse the body string into JSON
                                try {
                                    result = JSON.parse(bodyContent);
                                    console.log(`✅ Parsed inner body content:`, result);
                                } catch (innerParseError) {
                                    console.error(`❌ Failed to parse inner body JSON:`, innerParseError);
                                    console.error(`❌ Body content was:`, bodyContent);
                                    throw new Error(`Invalid JSON in response body: ${innerParseError.message}`);
                                }
                            }

                            console.log(`✅ Final parsed webhook response for ${viewId}:`, result);
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
        // UNIFIED NOTIFICATION SYSTEM
        // Consistent inline notifications for errors, warnings, and success messages
        // Brand colors: Error (red), Warning (orange), Success/Info (green #39b54a)
        // ========================================================================

        const notificationSystem = {
            /**
             * Brand color palette
             */
            colors: {
                error: {
                    text: '#d32f2f',
                    background: '#ffebee',
                    border: '#d32f2f'
                },
                warning: {
                    text: '#856404',
                    background: '#fff3cd',
                    border: '#ffc107'
                },
                success: {
                    text: '#2d7a2d',
                    background: '#e8f5e8',
                    border: '#39b54a'  // Greenlight brand green
                },
                info: {
                    text: '#2d7a2d',
                    background: '#e8f5e8',
                    border: '#39b54a'  // Same as success
                }
            },

            /**
             * Icons for each notification type
             */
            icons: {
                error: '❌',
                warning: '⚠️',
                success: '✅',
                info: 'ℹ️'
            },

            /**
             * Show inline notification below a field
             * Replaces all old notification styles with consistent design
             *
             * @param {string} viewId - View ID (e.g., 'view_4059')
             * @param {string} fieldId - Field ID (e.g., 'field_992')
             * @param {string} message - Notification message (can include HTML)
             * @param {string} type - 'error', 'warning', 'success', or 'info'
             * @param {string} actionLink - Optional link URL
             * @param {string} actionText - Optional link text (default: "View details")
             */
            showFieldNotification: function (viewId, fieldId, message, type = 'error', actionLink = null, actionText = 'View details') {
                const color = this.colors[type];
                const icon = this.icons[type];

                console.log(`${icon} Showing ${type} notification for ${fieldId}: ${message}`);

                const $field = $(`#${viewId} #${fieldId}, #${viewId} input[name="${fieldId}"], #${viewId} [name="${fieldId}"]`).first();

                if (!$field.length) {
                    console.warn(`⚠️ Could not find field ${fieldId} to show ${type} notification`);
                    return;
                }

                // Remove any existing notifications for this field
                $field.closest('.kn-input').find('.field-notification-message').remove();
                $field.removeClass('field-has-error field-has-warning field-has-info field-has-success');

                // Create notification element with unified style
                const notificationId = `notification-${type}-${fieldId}`;
                const $notification = $(`<div class="field-notification-message field-${type}-message" id="${notificationId}" style="
                    color: ${color.text};
                    font-size: 13px;
                    margin-top: 5px;
                    padding: 8px 12px;
                    background: ${color.background};
                    border-left: 3px solid ${color.border};
                    border-radius: 3px;
                    line-height: 1.5;
                "></div>`);

                // Build notification content
                $notification.html(`
                    <div style="display: flex; align-items: flex-start; gap: 8px;">
                        <span style="flex-shrink: 0; font-size: 14px;">${icon}</span>
                        <div style="flex: 1;">
                            <div>${message}</div>
                            ${actionLink ? `
                                <a href="${actionLink}" target="_blank" class="notification-view-link" style="
                                    color: ${color.text};
                                    font-weight: 600;
                                    text-decoration: none;
                                    font-size: 12px;
                                    margin-top: 6px;
                                    display: inline-block;
                                    cursor: pointer;
                                    padding: 4px 10px;
                                    background: rgba(255, 255, 255, 0.7);
                                    border-radius: 3px;
                                    border: 1px solid ${color.border};
                                    transition: all 0.2s ease;
                                ">${actionText} <i class="fa fa-arrow-right"></i></a>
                            ` : ''}
                        </div>
                    </div>
                `);

                // Add hover effects and click handler to the link
                $notification.find('.notification-view-link').on('mouseenter', function () {
                    $(this).css({
                        'background': 'rgba(255, 255, 255, 0.9)',
                        'border-color': color.border,
                        'transform': 'translateY(-1px)',
                        'box-shadow': '0 2px 4px rgba(0,0,0,0.1)'
                    });
                }).on('mouseleave', function () {
                    $(this).css({
                        'background': 'rgba(255, 255, 255, 0.7)',
                        'border-color': color.border,
                        'transform': 'translateY(0)',
                        'box-shadow': 'none'
                    });
                }).on('click', function (e) {
                    // Explicitly handle link clicks to ensure they work
                    e.preventDefault();
                    e.stopPropagation();
                    const href = $(this).attr('href');
                    if (href) {
                        console.log(`🔗 Opening link: ${href}`);
                        window.open(href, '_blank');
                    }
                });

                // Prevent clicks on the notification itself from doing anything unexpected
                $notification.on('click', function (e) {
                    // Stop propagation to prevent any parent handlers
                    e.stopPropagation();
                });

                // Add CSS class to field for styling hooks
                $field.addClass(`field-has-${type}`);

                // Insert notification after the field's container
                $field.closest('.kn-input').append($notification);

                // Behavior based on type - scroll into view but don't steal focus
                // This allows users to interact with other parts of the form
                if (type === 'error' || type === 'warning') {
                    // Scroll to field so user can see the error, but don't focus
                    // This prevents the aggressive focus-stealing that blocks other interactions
                    $field[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                // Success/info: no auto-scroll/focus
            },

            /**
             * Clear all notifications from a field
             */
            clearFieldNotification: function (viewId, fieldId) {
                const $field = $(`#${viewId} #${fieldId}, #${viewId} input[name="${fieldId}"], #${viewId} [name="${fieldId}"]`).first();

                if (!$field.length) return;

                $field.closest('.kn-input').find('.field-notification-message').remove();
                $field.removeClass('field-has-error field-has-warning field-has-info field-has-success');

                console.log(`🧹 Cleared notifications from ${fieldId}`);
            },

            /**
             * Clear all notifications from all fields in a view
             */
            clearAllNotifications: function (viewId) {
                $(`#${viewId} .field-notification-message`).remove();
                $(`#${viewId} .field-has-error, #${viewId} .field-has-warning, #${viewId} .field-has-info, #${viewId} .field-has-success`)
                    .removeClass('field-has-error field-has-warning field-has-info field-has-success');

                console.log(`🧹 Cleared all notifications from ${viewId}`);
            },

            /**
             * Show inline confirmation request with Yes/No buttons
             * Replaces modal dialog with inline approach
             *
             * @param {string} viewId - View ID
             * @param {string} message - Confirmation question (HTML allowed)
             * @param {function} onConfirm - Callback when user clicks Yes
             * @param {function} onCancel - Callback when user clicks No/Cancel
             * @param {object} options - { confirmText: 'Yes', cancelText: 'No', type: 'warning' }
             */
            showInlineConfirmation: function (viewId, message, onConfirm, onCancel, options = {}) {
                const {
                    confirmText = 'Yes, Proceed',
                    cancelText = 'Cancel',
                    type = 'warning',
                    insertBefore = `#${viewId} .kn-submit`  // Where to insert the confirmation
                } = options;

                const color = this.colors[type];
                const icon = this.icons[type];

                console.log(`${icon} Showing inline confirmation for ${viewId}`);

                // Remove any existing confirmations
                $(`#${viewId} .inline-confirmation`).remove();

                // Create confirmation element
                const $confirmation = $(`<div class="inline-confirmation" style="
                    margin: 20px 0;
                    padding: 15px;
                    background: ${color.background};
                    border: 2px solid ${color.border};
                    border-radius: 6px;
                "></div>`);

                $confirmation.html(`
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; align-items: flex-start; gap: 10px;">
                            <span style="flex-shrink: 0; font-size: 18px;">${icon}</span>
                            <div style="flex: 1; color: ${color.text}; font-size: 14px; line-height: 1.6;">
                                ${message}
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" class="confirmation-cancel" style="
                            background: #ccc;
                            color: #333;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                        ">${cancelText}</button>
                        <button type="button" class="confirmation-confirm" style="
                            background: #39b54a;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                        ">${confirmText}</button>
                    </div>
                `);

                // Insert before submit button
                const $insertPoint = $(insertBefore);
                if ($insertPoint.length) {
                    $insertPoint.before($confirmation);
                } else {
                    // Fallback: insert at end of form
                    $(`#${viewId} form`).append($confirmation);
                }

                // Handle confirmation
                $confirmation.find('.confirmation-confirm').on('click', function () {
                    $confirmation.remove();
                    if (onConfirm) onConfirm();
                });

                // Handle cancellation
                $confirmation.find('.confirmation-cancel').on('click', function () {
                    $confirmation.remove();
                    if (onCancel) onCancel();
                });

                // Scroll to confirmation
                $confirmation[0].scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Focus confirm button
                setTimeout(() => {
                    $confirmation.find('.confirmation-confirm').focus();
                }, 100);
            },

            /**
             * Submit Button State Manager
             * Controls submit button text, state, and visual feedback
             */
            submitButton: {
                /**
                 * Set submit button state
                 *
                 * @param {string} viewId - View ID
                 * @param {string} state - 'ready', 'loading', 'disabled', 'success', 'error'
                 * @param {string} customText - Optional custom text
                 */
                setState: function (viewId, state, customText = null) {
                    const $submitBtn = $(`#${viewId} .kn-button.is-primary, #${viewId} button[type="submit"]`).first();

                    if (!$submitBtn.length) {
                        console.warn(`⚠️ Submit button not found for ${viewId}`);
                        return;
                    }

                    const states = {
                        ready: {
                            text: customText || 'Submit',
                            disabled: false,
                            color: '#007cba',
                            cursor: 'pointer'
                        },
                        loading: {
                            text: customText || 'Processing...',
                            disabled: true,
                            color: '#007cba',
                            cursor: 'wait'
                        },
                        disabled: {
                            text: customText || 'Submit',
                            disabled: true,
                            color: '#ccc',
                            cursor: 'not-allowed'
                        },
                        success: {
                            text: customText || '✓ Success',
                            disabled: true,
                            color: '#39b54a',
                            cursor: 'default'
                        },
                        error: {
                            text: customText || '✗ Error - Try Again',
                            disabled: false,
                            color: '#d32f2f',
                            cursor: 'pointer'
                        }
                    };

                    const config = states[state] || states.ready;

                    $submitBtn
                        .text(config.text)
                        .prop('disabled', config.disabled)
                        .css({
                            'background-color': config.color,
                            'cursor': config.cursor,
                            'opacity': config.disabled ? '0.7' : '1'
                        });

                    console.log(`🔘 Submit button set to '${state}': "${config.text}"`);
                },

                /**
                 * Get original button text (stored on first call)
                 */
                getOriginalText: function (viewId) {
                    const $submitBtn = $(`#${viewId} .kn-button.is-primary, #${viewId} button[type="submit"]`).first();

                    if (!$submitBtn.data('originalText')) {
                        $submitBtn.data('originalText', $submitBtn.text());
                    }

                    return $submitBtn.data('originalText');
                },

                /**
                 * Reset to original state
                 */
                reset: function (viewId) {
                    const originalText = this.getOriginalText(viewId);
                    this.setState(viewId, 'ready', originalText);
                }
            }
        };

        // ========================================================================
        // FIELD CHANGE DETECTION FRAMEWORK
        // Tracks form field changes after validation to determine revalidation needs
        // ========================================================================

        /**
         * Field Change Strategies Configuration
         * Defines how each field should be handled when changed after validation
         *
         * Strategies:
         * - 'revalidate': Always revalidate when field changes (e.g., company name)
         * - 'conditional': Use custom logic to decide (e.g., email - revalidate if changed, allow if deleted)
         * - 'allow': Never revalidate, no post-submission needed (e.g., entity type, industry)
         * - 'post_only': No pre-validation needed, but requires post-submission webhook (e.g., address changes)
         */
        const fieldChangeStrategies = {
            view_4059: {  // Create Company Form
                field_992: {
                    strategy: 'revalidate',
                    reason: 'Company name changed - must check for duplicates'
                },
                field_3783: {
                    strategy: 'revalidate',
                    reason: 'Short name changed - must check for duplicates'
                },
                field_4164: {
                    strategy: 'conditional',
                    reason: 'Email validation depends on action',
                    condition: (oldVal, newVal) => {
                        // If email was deleted (made empty), allow submission without revalidation
                        if (!newVal || newVal.trim() === '') {
                            console.log('📧 Email deleted - allowing submission without revalidation');
                            return 'allow';
                        }
                        // If email was changed to a different value, revalidate
                        if (newVal !== oldVal) {
                            console.log(`📧 Email changed from "${oldVal}" to "${newVal}" - revalidation required`);
                            return 'revalidate';
                        }
                        // No change
                        return 'allow';
                    }
                },
                field_4056: {
                    strategy: 'conditional',
                    reason: 'Phone validation depends on action',
                    condition: (oldVal, newVal) => {
                        // Same logic as email
                        if (!newVal || newVal.trim() === '') {
                            console.log('📞 Phone deleted - allowing submission without revalidation');
                            return 'allow';
                        }
                        if (newVal !== oldVal) {
                            console.log(`📞 Phone changed from "${oldVal}" to "${newVal}" - revalidation required`);
                            return 'revalidate';
                        }
                        return 'allow';
                    }
                },
                // Address fields - never require revalidation (no duplicate check on addresses)
                street: { strategy: 'allow', reason: 'Address changes do not require revalidation' },
                street2: { strategy: 'allow', reason: 'Address changes do not require revalidation' },
                city: { strategy: 'allow', reason: 'Address changes do not require revalidation' },
                state: { strategy: 'allow', reason: 'Address changes do not require revalidation' },
                zip: { strategy: 'allow', reason: 'Address changes do not require revalidation' }
            },

            // ===== COMPANY UPDATE FORM =====
            view_5605: {
                field_992: {
                    strategy: 'revalidate',
                    reason: 'Company name changed - must check for duplicates'
                },
                field_3783: {
                    strategy: 'revalidate',
                    reason: 'Short name changed - must check for duplicates'
                },
                field_4164: {
                    strategy: 'conditional',
                    reason: 'Email validation depends on action',
                    condition: (oldVal, newVal) => {
                        // If email was deleted (made empty), allow submission but need post-webhook
                        if (!newVal || newVal.trim() === '') {
                            console.log('📧 Email deleted - no pre-validation needed, post-submission required');
                            return 'post_only';
                        }
                        // If email was changed to a different value, revalidate
                        if (newVal !== oldVal) {
                            console.log(`📧 Email changed from "${oldVal}" to "${newVal}" - revalidation required`);
                            return 'revalidate';
                        }
                        // No change
                        return 'allow';
                    }
                },
                field_4056: {
                    strategy: 'conditional',
                    reason: 'Phone validation depends on action',
                    condition: (oldVal, newVal) => {
                        // If phone was deleted (made empty), allow submission but need post-webhook
                        if (!newVal || newVal.trim() === '') {
                            console.log('📞 Phone deleted - no pre-validation needed, post-submission required');
                            return 'post_only';
                        }
                        // If phone was changed to a different value, revalidate
                        if (newVal !== oldVal) {
                            console.log(`📞 Phone changed from "${oldVal}" to "${newVal}" - revalidation required`);
                            return 'revalidate';
                        }
                        return 'allow';
                    }
                },
                // Address fields - no pre-validation, but post-submission webhook needed for SCN updates
                street: { strategy: 'post_only', reason: 'Address changes need post-submission webhook for SCN' },
                street2: { strategy: 'post_only', reason: 'Address changes need post-submission webhook for SCN' },
                city: { strategy: 'post_only', reason: 'Address changes need post-submission webhook for SCN' },
                state: { strategy: 'post_only', reason: 'Address changes need post-submission webhook for SCN' },
                zip: { strategy: 'post_only', reason: 'Address changes need post-submission webhook for SCN' }
            },

            // ===== CONTACT CREATION FORM =====
            view_5612: {
                // Name fields (first/last) - always require revalidation (duplicate detection)
                field_3860: {
                    strategy: 'revalidate',
                    reason: 'Name changed - must check for duplicate person'
                },
                // Preferred name - no validation needed
                field_3861: {
                    strategy: 'allow',
                    reason: 'Preferred name does not require validation'
                },
                // Email - conditional based on whether cleared or changed
                field_4164: {
                    strategy: 'conditional',
                    reason: 'Email validation depends on action',
                    condition: (oldVal, newVal) => {
                        if (!newVal || newVal.trim() === '') {
                            console.log('📧 Email deleted - allowing submission without revalidation');
                            return 'allow';
                        }
                        if (newVal !== oldVal) {
                            console.log(`📧 Email changed from "${oldVal}" to "${newVal}" - revalidation required`);
                            return 'revalidate';
                        }
                        return 'allow';
                    }
                },
                // Mobile - conditional based on whether cleared or changed
                field_4165: {
                    strategy: 'conditional',
                    reason: 'Mobile validation depends on action',
                    condition: (oldVal, newVal) => {
                        if (!newVal || newVal.trim() === '') {
                            console.log('📱 Mobile deleted - allowing submission without revalidation');
                            return 'allow';
                        }
                        if (newVal !== oldVal) {
                            console.log(`📱 Mobile changed from "${oldVal}" to "${newVal}" - revalidation required`);
                            return 'revalidate';
                        }
                        return 'allow';
                    }
                },
                // Phone - conditional based on whether cleared or changed
                field_4056: {
                    strategy: 'conditional',
                    reason: 'Phone validation depends on action',
                    condition: (oldVal, newVal) => {
                        if (!newVal || newVal.trim() === '') {
                            console.log('📞 Phone deleted - allowing submission without revalidation');
                            return 'allow';
                        }
                        if (newVal !== oldVal) {
                            console.log(`📞 Phone changed from "${oldVal}" to "${newVal}" - revalidation required`);
                            return 'revalidate';
                        }
                        return 'allow';
                    }
                }
            },

            // ===== CONTACT UPDATE FORM =====
            view_5626: {
                // Name fields (first/last) - always require revalidation (duplicate detection)
                field_3860: {
                    strategy: 'revalidate',
                    reason: 'Name changed - must check for duplicate person'
                },
                // Preferred name - superficial change, no validation needed (submit directly)
                field_3861: {
                    strategy: 'allow',
                    reason: 'Preferred name is superficial - does not require validation'
                },
                // Email - conditional based on whether cleared or changed
                field_4164: {
                    strategy: 'conditional',
                    reason: 'Email validation depends on action',
                    condition: (oldVal, newVal) => {
                        if (!newVal || newVal.trim() === '') {
                            console.log('📧 Email deleted - no pre-validation needed, post-submission required');
                            return 'post_only';
                        }
                        if (newVal !== oldVal) {
                            console.log(`📧 Email changed from "${oldVal}" to "${newVal}" - revalidation required`);
                            return 'revalidate';
                        }
                        return 'allow';
                    }
                },
                // Mobile - conditional based on whether cleared or changed
                field_4165: {
                    strategy: 'conditional',
                    reason: 'Mobile validation depends on action',
                    condition: (oldVal, newVal) => {
                        if (!newVal || newVal.trim() === '') {
                            console.log('📱 Mobile deleted - no pre-validation needed, post-submission required');
                            return 'post_only';
                        }
                        if (newVal !== oldVal) {
                            console.log(`📱 Mobile changed from "${oldVal}" to "${newVal}" - revalidation required`);
                            return 'revalidate';
                        }
                        return 'allow';
                    }
                },
                // Phone - conditional based on whether cleared or changed
                field_4056: {
                    strategy: 'conditional',
                    reason: 'Phone validation depends on action',
                    condition: (oldVal, newVal) => {
                        if (!newVal || newVal.trim() === '') {
                            console.log('📞 Phone deleted - no pre-validation needed, post-submission required');
                            return 'post_only';
                        }
                        if (newVal !== oldVal) {
                            console.log(`📞 Phone changed from "${oldVal}" to "${newVal}" - revalidation required`);
                            return 'revalidate';
                        }
                        return 'allow';
                    }
                }
            }
        };

        /**
         * Change Tracker Module
         * Captures validated field values and determines if revalidation is needed
         */
        const changeTracker = {
            // Stores field values after successful webhook validation
            // Structure: { viewId: { fieldId: validatedValue } }
            validatedValues: {},

            /**
             * Capture field values after successful webhook validation
             * Called after webhook returns 'proceed' or 'confirm'
             *
             * @param {string} viewId - The view ID (e.g., 'view_4059')
             * @param {object} formData - Form data object (not currently used, for future enhancement)
             */
            captureValidatedValues: function (viewId, formData) {
                if (!this.validatedValues[viewId]) {
                    this.validatedValues[viewId] = {};
                }

                const config = viewConfigs[viewId];
                if (!config || !config.fields) {
                    console.warn(`⚠️ No config found for ${viewId} - cannot capture validated values`);
                    return;
                }

                console.log(`📸 Capturing validated values for ${viewId}`);

                // Capture each configured field's current value
                Object.keys(config.fields).forEach(fieldId => {
                    const fieldConfig = config.fields[fieldId];

                    // Handle different selector types
                    let $field;
                    if (fieldConfig.selector) {
                        $field = $(fieldConfig.selector);
                    } else if (fieldConfig.selectors) {
                        // Skip composite fields (like name-fields, address)
                        return;
                    }

                    if ($field && $field.length) {
                        const value = $field.val() || '';
                        this.validatedValues[viewId][fieldId] = value;
                        console.log(`  ✓ ${fieldId}: "${value}"`);
                    }
                });
            },

            /**
             * Map field IDs to original value keys
             * Used for comparing current values against form load values
             *
             * @param {string} fieldId - The Knack field ID (e.g., 'field_992')
             * @returns {string} - The original value key (e.g., 'company_name')
             */
            getOriginalFieldKey: function (fieldId) {
                const fieldKeyMap = {
                    field_992: 'company_name',
                    field_3783: 'company_short_name',
                    field_4164: 'email',
                    field_4056: 'phone',
                    // Address fields map to street_address (composite)
                    street: 'street_address',
                    street2: 'street_address',
                    city: 'street_address',
                    state: 'street_address',
                    zip: 'street_address'
                };
                return fieldKeyMap[fieldId] || fieldId;
            },

            /**
             * Determine if revalidation is needed based on field changes
             * Uses fieldChangeStrategies to make intelligent decisions
             *
             * Priority logic:
             * - If ANY field requires 'revalidate', return true immediately
             * - If multiple fields changed, the most restrictive strategy wins
             *
             * @param {string} viewId - The view ID
             * @returns {boolean} - True if revalidation needed, false otherwise
             */
            needsRevalidation: function (viewId) {
                const state = window._fieldValidationState?.[viewId];

                // No validation state means no fields have changed
                if (!state) {
                    return false;
                }

                // Check if explicitly marked for revalidation (e.g., name change cleared comm errors)
                // This takes precedence over changedFields check
                if (state.needsRevalidation === true && state.forceRevalidation === true) {
                    console.log(`🔄 Revalidation required: explicitly marked via forceRevalidation flag`);
                    return true;
                }

                const changedFields = state.changedFields || [];
                if (changedFields.length === 0) {
                    return false;
                }

                const strategies = fieldChangeStrategies[viewId];
                if (!strategies) {
                    console.warn(`⚠️ No change strategies defined for ${viewId} - defaulting to revalidate`);
                    return true;
                }

                console.log(`🔍 Checking if revalidation needed for ${viewId}`);
                console.log(`   Changed fields: ${changedFields.join(', ')}`);

                // Check each changed field's strategy
                for (const fieldId of changedFields) {
                    const strategyConfig = strategies[fieldId];

                    if (!strategyConfig) {
                        console.log(`  ⚠️ No strategy for ${fieldId} - defaulting to revalidate`);
                        return true;
                    }

                    // Handle 'revalidate' strategy (highest priority)
                    if (strategyConfig.strategy === 'revalidate') {
                        // For update forms, check if value returned to original
                        const originalFormValues = window._originalFormValues || {};
                        const originalKey = this.getOriginalFieldKey(fieldId);
                        const originalVal = originalFormValues[originalKey] || '';

                        // Get current value from field
                        const config = viewConfigs[viewId];
                        const fieldConfig = config?.fields[fieldId];
                        if (fieldConfig && fieldConfig.selector) {
                            const $field = $(fieldConfig.selector);
                            const currentVal = $field.val() || '';

                            // If current value matches original, no revalidation needed
                            if (currentVal.toLowerCase() === originalVal.toLowerCase() && originalVal !== '') {
                                console.log(`  ✅ ${fieldId} returned to original value "${originalVal}" - no revalidation needed`);
                                continue;
                            }
                        }

                        console.log(`  🔄 ${fieldId} requires revalidation: ${strategyConfig.reason}`);
                        return true;
                    }

                    // Handle 'conditional' strategy
                    if (strategyConfig.strategy === 'conditional') {
                        const validatedVal = this.validatedValues[viewId]?.[fieldId] || '';

                        // Get current value
                        const config = viewConfigs[viewId];
                        const fieldConfig = config?.fields[fieldId];
                        if (!fieldConfig || !fieldConfig.selector) {
                            console.warn(`  ⚠️ Cannot get current value for ${fieldId}`);
                            continue;
                        }

                        const $field = $(fieldConfig.selector);
                        const newVal = $field.val() || '';

                        // Also get original value from form load (for update forms)
                        const originalFormValues = window._originalFormValues || {};
                        const originalVal = originalFormValues[this.getOriginalFieldKey(fieldId)] || '';

                        // If current value matches original, no revalidation needed
                        if (newVal.toLowerCase() === originalVal.toLowerCase()) {
                            console.log(`  ✅ ${fieldId} returned to original value "${originalVal}" - no revalidation needed`);
                            continue;
                        }

                        // Run condition function against validated value
                        const decision = strategyConfig.condition(validatedVal, newVal);

                        if (decision === 'revalidate') {
                            console.log(`  🔄 ${fieldId} requires revalidation (conditional): ${strategyConfig.reason}`);
                            return true;
                        } else {
                            console.log(`  ✅ ${fieldId} change allows submission: ${decision}`);
                        }
                    }

                    // Handle 'allow' strategy
                    if (strategyConfig.strategy === 'allow') {
                        console.log(`  ✅ ${fieldId} change allowed: ${strategyConfig.reason}`);
                        // Continue checking other fields
                    }

                    // Handle 'post_only' strategy (no pre-submission validation, post-submission webhook handles it)
                    if (strategyConfig.strategy === 'post_only') {
                        console.log(`  📬 ${fieldId} change handled by post-submission webhook: ${strategyConfig.reason}`);
                        // Continue checking other fields - doesn't require revalidation
                    }
                }

                console.log(`✅ No revalidation needed - all changes allow direct submission`);
                return false;
            },

            /**
             * Get a summary of what changed and why revalidation is/isn't needed
             * Used for informative user messages
             *
             * @param {string} viewId - The view ID
             * @returns {object} - { needsRevalidation: boolean, changedFields: [], reasons: [] }
             */
            getChangesSummary: function (viewId) {
                const state = window._fieldValidationState?.[viewId];
                if (!state || !state.needsRevalidation) {
                    return { needsRevalidation: false, changedFields: [], reasons: [] };
                }

                const changedFields = state.changedFields || [];
                const strategies = fieldChangeStrategies[viewId] || {};
                const reasons = [];

                let needsRevalidation = false;

                changedFields.forEach(fieldId => {
                    const strategyConfig = strategies[fieldId];

                    if (!strategyConfig) {
                        reasons.push(`${fieldId}: No strategy defined (defaulting to revalidate)`);
                        needsRevalidation = true;
                        return;
                    }

                    if (strategyConfig.strategy === 'revalidate') {
                        reasons.push(strategyConfig.reason);
                        needsRevalidation = true;
                    } else if (strategyConfig.strategy === 'conditional') {
                        const oldVal = this.validatedValues[viewId]?.[fieldId] || '';
                        const config = viewConfigs[viewId];
                        const fieldConfig = config?.fields[fieldId];
                        const $field = $(fieldConfig?.selector);
                        const newVal = $field.val() || '';

                        const decision = strategyConfig.condition(oldVal, newVal);
                        if (decision === 'revalidate') {
                            reasons.push(strategyConfig.reason);
                            needsRevalidation = true;
                        }
                    }
                });

                return { needsRevalidation, changedFields, reasons };
            },

            /**
             * Check if pre-submission webhook validation is actually needed for update forms
             *
             * Pre-submission validation is ONLY needed if a COM field has:
             * 1. A non-empty value AND
             * 2. That value is different from the original
             *
             * If COM fields are empty or reverted to original → skip pre-submission
             * (Post-submission will still handle deletions and updates)
             *
             * @param {string} viewId - The view ID
             * @returns {boolean} - True if pre-submission webhook should fire
             */
            needsPreSubmissionValidation: function (viewId) {
                const config = viewConfigs[viewId];
                if (!config) return false;

                // Only applies to update forms
                const formType = config.formType;
                if (formType !== 'contact-update' && formType !== 'company-update') {
                    // For create forms, always need pre-submission validation
                    return true;
                }

                // Get original values
                const originalValues = window._originalFormValues || {};

                // COM field mappings for contact forms
                const comFieldsContact = {
                    field_4164: { original: 'email', normalize: 'email' },
                    field_4165: { original: 'mobile', normalize: 'phone' },
                    field_4056: { original: 'phone', normalize: 'phone' }
                };

                // COM field mappings for company forms
                const comFieldsCompany = {
                    field_4164: { original: 'email', normalize: 'email' },
                    field_4056: { original: 'phone', normalize: 'phone' }
                };

                const comFields = formType === 'contact-update' ? comFieldsContact : comFieldsCompany;

                console.log(`🔍 Checking if pre-submission validation needed for ${viewId} (${formType})`);

                let needsValidation = false;

                for (const [fieldId, mapping] of Object.entries(comFields)) {
                    const fieldConfig = config.fields[fieldId];
                    if (!fieldConfig) continue;

                    // Get current value
                    const $field = $(fieldConfig.selector);
                    const currentValue = ($field.val() || '').trim();

                    // Get original value
                    const originalValue = (originalValues[mapping.original] || '').trim();

                    // Normalize for comparison
                    let normalizedCurrent = currentValue;
                    let normalizedOriginal = originalValue;

                    if (mapping.normalize === 'email' && typeof contactFormHandler !== 'undefined') {
                        normalizedCurrent = contactFormHandler.normalizeEmail(currentValue);
                        normalizedOriginal = contactFormHandler.normalizeEmail(originalValue);
                    } else if (mapping.normalize === 'phone' && typeof contactFormHandler !== 'undefined') {
                        normalizedCurrent = contactFormHandler.normalizePhone(currentValue);
                        normalizedOriginal = contactFormHandler.normalizePhone(originalValue);
                    }

                    const isEmpty = normalizedCurrent === '';
                    const isUnchanged = normalizedCurrent === normalizedOriginal;

                    console.log(`   ${fieldId}: current="${normalizedCurrent}", original="${normalizedOriginal}", empty=${isEmpty}, unchanged=${isUnchanged}`);

                    // If non-empty AND different from original → needs validation
                    if (!isEmpty && !isUnchanged) {
                        console.log(`   ✓ ${fieldId} has new non-empty value - pre-submission validation needed`);
                        needsValidation = true;
                        break; // One is enough to require validation
                    }
                }

                if (!needsValidation) {
                    console.log(`   → No new non-empty COM values - skipping pre-submission validation`);
                }

                return needsValidation;
            },

            /**
             * Clear validation state after successful submission
             * Should be called after form submits to Knack
             *
             * @param {string} viewId - The view ID
             */
            clearValidationState: function (viewId) {
                // Clear window validation state
                if (window._fieldValidationState && window._fieldValidationState[viewId]) {
                    delete window._fieldValidationState[viewId];
                    console.log(`🧹 Cleared window._fieldValidationState for ${viewId}`);
                }

                // Clear tracked validated values
                if (this.validatedValues[viewId]) {
                    delete this.validatedValues[viewId];
                    console.log(`🧹 Cleared validatedValues for ${viewId}`);
                }
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

                // Store data from pre-submission response (for company forms)
                if (result.ecn_record_id) {
                    window._ecnRecordId = result.ecn_record_id;
                    console.log(`📌 Stored ECN record ID from pre-submission response: ${result.ecn_record_id}`);
                } else if (result.ecn_id) {
                    window._ecnRecordId = result.ecn_id;
                    console.log(`📌 Stored ECN record ID from pre-submission response: ${result.ecn_id}`);
                }

                // Store other values from pre-submission response
                // Handle is_test as boolean or Knack Yes/No string
                if (typeof result.is_test !== 'undefined') {
                    // Convert "Yes"/"No" strings to boolean, or keep boolean as-is
                    const isTestValue = result.is_test === 'Yes' || result.is_test === true;
                    window._isTest = isTestValue;
                    console.log(`📌 Stored is_test from pre-submission response: ${result.is_test} → ${isTestValue}`);
                }

                if (result.com_action_type) {
                    window._comActionType = result.com_action_type;
                    console.log(`📌 Stored com_action_type from pre-submission response: ${result.com_action_type}`);
                }

                if (result.shared_com_ids) {
                    window._sharedComIds = result.shared_com_ids;
                    console.log(`📌 Stored shared_com_ids from pre-submission response: ${result.shared_com_ids}`);
                }

                if (result.knack_api_payloads) {
                    window._knackApiPayloads = result.knack_api_payloads;
                    console.log(`📌 Stored knack_api_payloads from pre-submission response`);
                }

                switch (action) {
                    case 'block':
                        // Capture validated values even for blocks
                        // This enables proper change detection when user clears errors
                        changeTracker.captureValidatedValues(viewId, formData);
                        this.blockSubmission(result, viewId, $form, $submitBtn, originalText);
                        break;

                    case 'confirm':
                        // Capture validated values before showing confirmation dialog
                        // User may cancel and edit fields, we need baseline for change detection
                        changeTracker.captureValidatedValues(viewId, formData);
                        this.showConfirmationDialog(result, formData, viewId, $form, $submitBtn, originalText);
                        break;

                    case 'proceed':
                        // Capture validated values before proceeding
                        // This establishes baseline for future change detection
                        changeTracker.captureValidatedValues(viewId, formData);
                        this.proceedWithSubmission(formData, viewId, result);
                        break;

                    default:
                        console.error('Unknown action required:', action);
                        this.showError('Unexpected validation response. Please try again.');
                        $submitBtn.prop('disabled', false).text(originalText);
                }
            },

            /**
             * Field error state manager
             */
            fieldErrors: {},

            /**
             * Last known value for each field with an error notification
             * Used to prevent clearing notifications when value hasn't changed
             */
            lastErrorValues: {},

            /**
             * Pending shareable conflicts that need resolution before submission
             * These are shown as orange warnings (not red errors) but still block submission
             */
            pendingShareableConflicts: {},

            /**
             * Show inline error for a specific field
             */
            showFieldError: function (viewId, fieldId, errorMessage, viewLink = null) {
                // Set flag to prevent change handler from interfering
                if (!window._showingError) {
                    window._showingError = {};
                }
                window._showingError[fieldId] = true;

                // Get current field value to store with error
                const $field = $(`#${viewId} #${fieldId}, #${viewId} input[name="${fieldId}"], #${viewId} [name="${fieldId}"]`).first();
                const currentValue = $field.val() || '';

                console.log(`📌 Showing error for ${fieldId}, current value: "${currentValue}"`);

                // Store error state
                if (!this.fieldErrors[viewId]) {
                    this.fieldErrors[viewId] = {};
                }

                // Only update originalValue if this is a new error (not a re-show)
                const existingError = this.fieldErrors[viewId][fieldId];

                this.fieldErrors[viewId][fieldId] = {
                    message: errorMessage,
                    viewLink: viewLink,
                    value: currentValue,
                    originalValue: existingError?.originalValue || currentValue // Preserve original if re-showing
                };

                // FUNDAMENTAL: Store last value for this field's error notification
                // This prevents notification from clearing unless value actually changes
                if (!this.lastErrorValues[viewId]) {
                    this.lastErrorValues[viewId] = {};
                }
                this.lastErrorValues[viewId][fieldId] = currentValue;

                // Store in _problematicValues immediately so blur handler can check it
                // This is for webhook errors specifically - permanent storage of known bad values
                if (!window._problematicValues) {
                    window._problematicValues = {};
                }
                if (!window._problematicValues[viewId]) {
                    window._problematicValues[viewId] = {};
                }
                if (!window._problematicValues[viewId][fieldId]) {
                    window._problematicValues[viewId][fieldId] = {
                        value: currentValue,
                        message: errorMessage,
                        viewLink: viewLink
                    };
                }

                console.log(`📌 Stored error value for ${fieldId}: "${currentValue}"`);
                console.log(`📌 Last error value stored: "${currentValue}"`);

                // Use unified notification system
                notificationSystem.showFieldNotification(
                    viewId,
                    fieldId,
                    errorMessage,
                    'error',
                    viewLink,
                    'View existing record'
                );

                // Disable submit button
                this.disableSubmit(viewId);

                // Clear the flag after a longer delay to allow any pending events to settle
                // Extended from 100ms to 500ms to handle async webhook responses
                setTimeout(() => {
                    if (window._showingError) {
                        delete window._showingError[fieldId];
                        console.log(`🔓 Cleared showingError flag for ${fieldId}`);
                    }
                }, 500);
            },

            /**
             * Show warning message for a field (orange/yellow - used for conflicts/shared contacts)
             * Color scheme: #ffc107 border, #fff3cd background, #856404 text
             */
            showFieldWarning: function (viewId, fieldId, warningMessage, actionLink = null) {
                // Use unified notification system
                notificationSystem.showFieldNotification(
                    viewId,
                    fieldId,
                    warningMessage,
                    'warning',
                    actionLink,
                    'View details'
                );
            },

            /**
             * Show info message for a field (green - used for confirmations)
             * Color scheme: #39b54a border, #e8f5e8 background, #2d7a2d text
             */
            showFieldInfo: function (viewId, fieldId, infoMessage) {
                // Use unified notification system
                notificationSystem.showFieldNotification(
                    viewId,
                    fieldId,
                    infoMessage,
                    'info'
                );
            },

            /**
             * Clear error for a specific field
             */
            clearFieldError: function (viewId, fieldId) {
                console.log(`✅ Clearing field error for ${fieldId}`);

                // Use unified notification system to clear
                notificationSystem.clearFieldNotification(viewId, fieldId);

                // Clear error state
                if (this.fieldErrors[viewId]) {
                    delete this.fieldErrors[viewId][fieldId];
                    console.log(`🗑️ Deleted fieldErrors[${viewId}][${fieldId}]. Remaining:`, Object.keys(this.fieldErrors[viewId] || {}));
                }

                // Clear last error value
                if (this.lastErrorValues[viewId]) {
                    delete this.lastErrorValues[viewId][fieldId];
                }

                // Debug: Log current state before checking hasNoErrors
                console.log(`📊 State after clearing ${fieldId}:`, {
                    fieldErrors: this.fieldErrors[viewId] ? Object.keys(this.fieldErrors[viewId]) : [],
                    pendingShareableConflicts: this.pendingShareableConflicts[viewId] ? Object.keys(this.pendingShareableConflicts[viewId]) : []
                });

                // Re-enable submit if no more errors
                const noErrors = this.hasNoErrors(viewId);
                console.log(`🔍 hasNoErrors(${viewId}) = ${noErrors}`);
                if (noErrors) {
                    this.enableSubmit(viewId);
                } else {
                    console.log(`⚠️ Submit button NOT enabled - errors still exist`);
                }
            },

            /**
             * Clear warning for a specific field
             */
            clearFieldWarning: function (viewId, fieldId) {
                console.log(`✅ Clearing field warning for ${fieldId}`);

                const $field = $(`#${viewId} #${fieldId}, #${viewId} input[name="${fieldId}"], #${viewId} [name="${fieldId}"]`).first();

                // Remove warning UI
                $field.closest('.kn-input').find('.field-warning-message').remove();
                $field.removeClass('field-has-warning');
            },

            /**
             * Clear info for a specific field
             */
            clearFieldInfo: function (viewId, fieldId) {
                console.log(`✅ Clearing field info for ${fieldId}`);

                const $field = $(`#${viewId} #${fieldId}, #${viewId} input[name="${fieldId}"], #${viewId} [name="${fieldId}"]`).first();

                // Remove info UI
                $field.closest('.kn-input').find('.field-info-message').remove();
                $field.removeClass('field-has-info');
            },

            /**
             * Clear all warnings from a view
             */
            clearAllWarnings: function (viewId) {
                console.log(`✅ Clearing all warnings for ${viewId}`);
                // Use unified notification system to clear all notifications
                notificationSystem.clearAllNotifications(viewId);
            },

            /**
             * Check if form has any field errors or pending shareable conflicts
             */
            hasNoErrors: function (viewId) {
                const hasFieldErrors = this.fieldErrors[viewId] && Object.keys(this.fieldErrors[viewId]).length > 0;
                const hasPendingShareable = this.pendingShareableConflicts[viewId] && Object.keys(this.pendingShareableConflicts[viewId]).length > 0;

                if (hasFieldErrors) {
                    console.log(`🚫 hasNoErrors: Found field errors for ${viewId}`);
                }
                if (hasPendingShareable) {
                    console.log(`🚫 hasNoErrors: Found pending shareable conflicts for ${viewId}:`, Object.keys(this.pendingShareableConflicts[viewId]));
                }

                return !hasFieldErrors && !hasPendingShareable;
            },

            /**
             * Reset all form state for a fresh form session
             * Called when user clicks "Add Contact" or "Add Company" button from search
             */
            resetFormState: function (viewId) {
                console.log(`🧹 Resetting form state for ${viewId || 'all views'}`);

                // Clear field errors
                if (viewId) {
                    delete this.fieldErrors[viewId];
                    delete this.lastErrorValues[viewId];
                    delete this.pendingShareableConflicts[viewId];
                } else {
                    this.fieldErrors = {};
                    this.lastErrorValues = {};
                    this.pendingShareableConflicts = {};
                }

                // Clear window-level tracking variables
                delete window._problematicValues;
                delete window._phoneIsShared;
                delete window._sharedPhoneComIds;
                delete window._sharedComIds;
                delete window._fieldValidationState;
                delete window._preSubmissionFormData;
                delete window._ecnRecordId;
                delete window._isTest;
                delete window.skipValidationForSubmit;

                // Clear change tracker state
                if (viewId) {
                    changeTracker.clearValidationState(viewId);
                }

                console.log(`✅ Form state reset complete - ready for new ${viewId || 'form'} session`);
            },

            /**
             * Disable submit button
             */
            disableSubmit: function (viewId) {
                const $submitBtn = $(`#${viewId} button[type="submit"]`);
                $submitBtn.prop('disabled', true).css({
                    'opacity': '0.5',
                    'cursor': 'not-allowed'
                });
            },

            /**
             * Enable submit button with correct text based on validation state
             *
             * Button text logic:
             * - "Validate" if validation-required fields were changed (company name, short name, email, phone)
             * - "Save" if no revalidation needed (can proceed directly)
             */
            enableSubmit: function (viewId) {
                const $submitBtn = $(`#${viewId} button[type="submit"]`);

                // Determine if revalidation is needed based on changed fields
                const needsRevalidation = changeTracker.needsRevalidation(viewId);

                // Set button text based on validation state
                const buttonText = needsRevalidation ? 'Validate' : 'Save';

                $submitBtn
                    .prop('disabled', false)
                    .text(buttonText)
                    .css({
                        'opacity': '1',
                        'cursor': 'pointer',
                        'background-color': '#007cba'
                    });

                console.log(`🔘 Submit button enabled with text "${buttonText}" (needsRevalidation: ${needsRevalidation})`);
            },

            /**
             * Update Processing Status field (field_4023) for view_5605 based on email/phone changes
             * NOTE: This function is deprecated - polling system handles status detection instead
             */
            updateProcessingStatus: function (viewId) {
                // Deprecated - polling system in scene_2397 handles status detection
                return;
            },

            /**
             * Setup field change listeners to clear errors and trigger re-validation
             * Uses view-specific fields from viewConfigs instead of a global list
             */
            setupFieldErrorListeners: function (viewId) {
                const self = this;

                // Get fields from viewConfigs for this specific view
                const viewConfig = viewConfigs[viewId];
                if (!viewConfig || !viewConfig.fields) {
                    console.log(`⚠️ No viewConfig or fields defined for ${viewId}, skipping listener setup`);
                    return;
                }

                // Extract field IDs from the view's configuration
                // Skip virtual fields like 'contact_group' and 'address' that don't have direct selectors
                const fieldsToWatch = Object.keys(viewConfig.fields).filter(fieldId => {
                    // Only include actual field IDs (field_XXXX pattern)
                    return fieldId.startsWith('field_');
                });

                console.log(`👂 Setting up field error listeners for ${viewId}:`, fieldsToWatch);

                fieldsToWatch.forEach(fieldId => {
                    const fieldConfig = viewConfig.fields[fieldId];
                    // Use selector from config if available, otherwise fall back to standard patterns
                    const selector = fieldConfig.selector || `#${fieldId}`;
                    const $field = $(`#${viewId} ${selector}, #${viewId} input[name="${fieldId}"], #${viewId} [name="${fieldId}"]`).first();

                    if (!$field.length) {
                        console.log(`⚠️ Field ${fieldId} not found in ${viewId}, skipping listener setup`);
                        return;
                    }

                    $field.on('input change', function () {
                        const fieldValue = $(this).val().trim();

                        console.log(`🔄 Field ${fieldId} changed (${$(this).attr('type')} input), value: "${fieldValue}"`);

                        // CRITICAL: If we're in the middle of showing an error, ignore spurious change events
                        // This prevents type="email" inputs from clearing themselves when notification DOM updates
                        if (window._showingError && window._showingError[fieldId]) {
                            console.log(`⏭️ Ignoring change event for ${fieldId} - currently showing error`);
                            return;
                        }

                        // Keep a permanent record of problematic values (even after error cleared)
                        if (!window._problematicValues) {
                            window._problematicValues = {};
                        }
                        if (!window._problematicValues[viewId]) {
                            window._problematicValues[viewId] = {};
                        }

                        // Check if this field currently has an error
                        if (self.fieldErrors[viewId] && self.fieldErrors[viewId][fieldId]) {
                            const errorState = self.fieldErrors[viewId][fieldId];

                            // FUNDAMENTAL: Get the last value that had the error
                            const lastErrorValue = self.lastErrorValues[viewId] && self.lastErrorValues[viewId][fieldId];

                            console.log(`📊 Change check for ${fieldId}:`, {
                                currentValue: fieldValue,
                                lastErrorValue: lastErrorValue,
                                valueChanged: fieldValue.toLowerCase() !== (lastErrorValue || '').toLowerCase()
                            });

                            // Store the problematic value permanently
                            if (!window._problematicValues[viewId][fieldId]) {
                                window._problematicValues[viewId][fieldId] = {
                                    value: errorState.originalValue || errorState.value,
                                    message: errorState.message,
                                    viewLink: errorState.viewLink
                                };
                                console.log(`📝 Stored problematic value for ${fieldId}: "${window._problematicValues[viewId][fieldId].value}"`);
                            }

                            // ONLY clear error if value has actually changed from the last error value
                            // For phone fields, also normalize for comparison to handle formatting differences
                            let valuesDifferent = false;
                            if (fieldId === 'field_4056' || fieldId === 'field_4165') {
                                // For phone/mobile fields, normalize both values before comparing
                                const normalizedCurrent = fieldValue.replace(/[\s\-\(\)\.+]/g, '');
                                const normalizedLast = (lastErrorValue || '').replace(/[\s\-\(\)\.+]/g, '');
                                valuesDifferent = normalizedCurrent !== normalizedLast;
                                console.log(`📞 Phone comparison: current="${normalizedCurrent}" vs last="${normalizedLast}" → different=${valuesDifferent}`);
                            } else {
                                valuesDifferent = fieldValue.toLowerCase() !== (lastErrorValue || '').toLowerCase();
                            }

                            if (valuesDifferent) {
                                console.log(`✅ Value changed from "${lastErrorValue}" to "${fieldValue}" - clearing error`);
                                self.clearFieldError(viewId, fieldId);
                            } else {
                                console.log(`⏭️ Value unchanged ("${fieldValue}") - keeping error visible`);
                                // Update lastErrorValue to current value to track any future changes
                                self.lastErrorValues[viewId][fieldId] = fieldValue;
                                return; // Don't proceed with re-validation marking
                            }

                            // Mark that we need re-validation before submission
                            if (!window._fieldValidationState) {
                                window._fieldValidationState = {};
                            }
                            if (!window._fieldValidationState[viewId]) {
                                window._fieldValidationState[viewId] = {};
                            }
                            window._fieldValidationState[viewId].needsRevalidation = true;
                            window._fieldValidationState[viewId].changedFields = window._fieldValidationState[viewId].changedFields || [];

                            if (!window._fieldValidationState[viewId].changedFields.includes(fieldId)) {
                                window._fieldValidationState[viewId].changedFields.push(fieldId);
                            }

                            console.log(`⏳ Marked for re-validation. Changed fields:`, window._fieldValidationState[viewId].changedFields);
                        } else {
                            // No current error, but check if user re-entered a previously problematic value
                            const problematicValue = window._problematicValues[viewId] && window._problematicValues[viewId][fieldId];
                            if (problematicValue && fieldValue !== '') {
                                // For phone fields, normalize both values for comparison
                                let currentNormalized = fieldValue.toLowerCase();
                                let problematicNormalized = (problematicValue.value || '').toLowerCase();

                                if (fieldId === 'field_4056') {
                                    // Normalize phone numbers: remove spaces, dashes, parentheses
                                    currentNormalized = fieldValue.replace(/[\s\-\(\)\.]/g, '');
                                    problematicNormalized = (problematicValue.value || '').replace(/[\s\-\(\)\.]/g, '');
                                }

                                const isSameErrorValue = currentNormalized === problematicNormalized;

                                if (isSameErrorValue) {
                                    // User re-entered the problematic value
                                    console.log(`⚠️ User re-entered problematic value "${fieldValue}" (normalized: "${currentNormalized}")`);

                                    // Check if error notification already exists - don't re-show if it does
                                    const $existingNotification = $(`#${viewId} #notification-error-${fieldId}, #${viewId} .field-notification-message`).filter(function() {
                                        return $(this).closest('.kn-input').find(`[name="${fieldId}"], #${fieldId}`).length > 0;
                                    });

                                    if ($existingNotification.length > 0) {
                                        console.log(`⏭️ Error notification already visible for ${fieldId}, skipping re-show`);
                                        return;
                                    }

                                    // Check if this was a shareable phone - show phone sharing UI instead of regular error
                                    if (problematicValue.is_shareable && problematicValue.conflict) {
                                        console.log(`📞 Re-showing phone sharing notification for shareable conflict`);
                                        // Reset phone sharing flag since they re-entered the value
                                        window._phoneIsShared = false;
                                        // Get the original submit button text for the callback
                                        const $submitBtn = $(`#${viewId} button[type="submit"]`);
                                        const originalText = $submitBtn.data('original-text') || 'Submit';
                                        // Re-show the phone sharing notification
                                        self.showPhoneSharingNotification(viewId, problematicValue.conflict, originalText);
                                    } else {
                                        // Regular error - re-show the error message
                                        self.showFieldError(viewId, fieldId, problematicValue.message, problematicValue.viewLink);
                                    }
                                }
                            }

                            // FOR UPDATE FORMS: Track changes from original values
                            // This enables the decision tree logic (revalidate vs post_only vs allow)
                            const originalValues = changeTracker.validatedValues[viewId];
                            if (originalValues) {
                                const originalValue = originalValues[fieldId] || '';
                                const hasChanged = fieldValue.toLowerCase() !== originalValue.toLowerCase();

                                if (hasChanged) {
                                    // Initialize validation state if needed
                                    if (!window._fieldValidationState) {
                                        window._fieldValidationState = {};
                                    }
                                    if (!window._fieldValidationState[viewId]) {
                                        window._fieldValidationState[viewId] = { needsRevalidation: false, changedFields: [] };
                                    }

                                    // Add to changed fields if not already there
                                    if (!window._fieldValidationState[viewId].changedFields.includes(fieldId)) {
                                        window._fieldValidationState[viewId].changedFields.push(fieldId);
                                        console.log(`📝 Field ${fieldId} changed from original "${originalValue}" to "${fieldValue}"`);
                                    }

                                    // Check strategy to determine if revalidation needed
                                    const strategies = fieldChangeStrategies[viewId];
                                    if (strategies && strategies[fieldId]) {
                                        const strategyConfig = strategies[fieldId];

                                        if (strategyConfig.strategy === 'revalidate') {
                                            // Use needsRevalidation() which checks against original form values
                                            const stillNeedsRevalidation = changeTracker.needsRevalidation(viewId);
                                            window._fieldValidationState[viewId].needsRevalidation = stillNeedsRevalidation;

                                            if (stillNeedsRevalidation) {
                                                console.log(`🔄 ${fieldId} requires revalidation: ${strategyConfig.reason}`);
                                                // Update button text to "Validate"
                                                const $submitBtn = $(`#${viewId} button[type="submit"]`);
                                                if ($submitBtn.text() !== 'Validate') {
                                                    $submitBtn.text('Validate');
                                                    console.log(`🔘 Button text changed to "Validate"`);
                                                }
                                            } else {
                                                console.log(`✅ ${fieldId} returned to original - no revalidation needed`);
                                                // Update button text to "Save"
                                                const $submitBtn = $(`#${viewId} button[type="submit"]`);
                                                if ($submitBtn.text() === 'Validate') {
                                                    $submitBtn.text('Save');
                                                    console.log(`🔘 Button text changed back to "Save"`);
                                                }
                                            }
                                            // Update Processing Status for view_5605
                                            self.updateProcessingStatus(viewId);
                                        } else if (strategyConfig.strategy === 'conditional' && strategyConfig.condition) {
                                            const decision = strategyConfig.condition(originalValue, fieldValue);
                                            console.log(`📋 Conditional strategy for ${fieldId} returned: ${decision}`);

                                            // Always use needsRevalidation() to check against original form values
                                            const stillNeedsRevalidation = changeTracker.needsRevalidation(viewId);
                                            window._fieldValidationState[viewId].needsRevalidation = stillNeedsRevalidation;

                                            if (stillNeedsRevalidation) {
                                                console.log(`🔄 Revalidation needed for ${viewId}`);
                                                // Update button text to "Validate"
                                                const $submitBtn = $(`#${viewId} button[type="submit"]`);
                                                if ($submitBtn.text() !== 'Validate') {
                                                    $submitBtn.text('Validate');
                                                    console.log(`🔘 Button text changed to "Validate"`);
                                                }
                                            } else {
                                                console.log(`✅ No revalidation needed - decision: ${decision}`);
                                                // Update button text to "Save"
                                                const $submitBtn = $(`#${viewId} button[type="submit"]`);
                                                if ($submitBtn.text() === 'Validate') {
                                                    $submitBtn.text('Save');
                                                    console.log(`🔘 Button text changed back to "Save" (${decision})`);
                                                }
                                            }
                                            // Update Processing Status for view_5605
                                            self.updateProcessingStatus(viewId);
                                        }
                                    }
                                } else {
                                    // Value returned to original - remove from changed fields
                                    if (window._fieldValidationState && window._fieldValidationState[viewId]) {
                                        const idx = window._fieldValidationState[viewId].changedFields.indexOf(fieldId);
                                        if (idx > -1) {
                                            window._fieldValidationState[viewId].changedFields.splice(idx, 1);
                                            console.log(`↩️ Field ${fieldId} returned to original value - removed from changed fields`);

                                            // Recalculate if revalidation is still needed
                                            const stillNeedsRevalidation = changeTracker.needsRevalidation(viewId);
                                            window._fieldValidationState[viewId].needsRevalidation = stillNeedsRevalidation;

                                            // Update button text if no longer needs revalidation
                                            if (!stillNeedsRevalidation) {
                                                const $submitBtn = $(`#${viewId} button[type="submit"]`);
                                                if ($submitBtn.text() === 'Validate') {
                                                    $submitBtn.text('Save');
                                                    console.log(`🔘 Button text changed back to "Save"`);
                                                }
                                            }
                                            // Update Processing Status for view_5605
                                            self.updateProcessingStatus(viewId);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    console.log(`✅ Listener setup for ${fieldId}`);
                });

                // =====================================================================
                // NAME FIELD LISTENERS (for contact forms that allow shared contacts)
                // =====================================================================
                // For forms where shared contacts ARE allowed (e.g., Create Contact with Company),
                // changing the name means the combination is different → needs revalidation.
                // For standalone Create Contact form (view_5612), shared contacts are NOT allowed,
                // so name changes are irrelevant - the comm channel itself is blocked.

                // Skip name listener for forms that don't allow shared contacts
                // (viewConfig already defined at top of function)
                if (viewConfig.allowSharedContacts === false || viewId === 'view_5612') {
                    console.log(`⏭️ Skipping name change listener for ${viewId} (shared contacts not allowed)`);
                } else {
                    const nameFields = ['input[name="first"]', 'input[name="last"]'];
                    const commFieldIds = ['field_4164', 'field_4165', 'field_4056']; // email, mobile, phone

                    nameFields.forEach(selector => {
                        const $nameField = $(`#${viewId} ${selector}`);

                        if (!$nameField.length) {
                            // Name fields only exist on contact forms, skip silently for company forms
                            return;
                        }

                        $nameField.off('input.nameErrorClear').on('input.nameErrorClear', function () {
                            const fieldValue = $(this).val().trim();
                            console.log(`👤 Name field changed: "${selector}" = "${fieldValue}"`);

                            // Check if any communication fields have errors
                            let hadErrors = false;
                            commFieldIds.forEach(commFieldId => {
                                if (self.fieldErrors[viewId] && self.fieldErrors[viewId][commFieldId]) {
                                    console.log(`🧹 Clearing ${commFieldId} error due to name change`);
                                    self.clearFieldError(viewId, commFieldId);
                                    hadErrors = true;

                                    // Also clear from problematic values since combination changed
                                    if (window._problematicValues && window._problematicValues[viewId]) {
                                        delete window._problematicValues[viewId][commFieldId];
                                        console.log(`🧹 Cleared problematic value for ${commFieldId}`);
                                    }
                                }
                            });

                            if (hadErrors) {
                                // Mark for revalidation with forceRevalidation flag
                                // This ensures revalidation even without changedFields
                                if (!window._fieldValidationState) {
                                    window._fieldValidationState = {};
                                }
                                if (!window._fieldValidationState[viewId]) {
                                    window._fieldValidationState[viewId] = { needsRevalidation: true, changedFields: [] };
                                }
                                window._fieldValidationState[viewId].needsRevalidation = true;
                                window._fieldValidationState[viewId].forceRevalidation = true;

                                // Update button to "Validate"
                                const $submitBtn = $(`#${viewId} button[type="submit"]`);
                                if ($submitBtn.text() !== 'Validate') {
                                    $submitBtn.text('Validate');
                                    console.log(`🔘 Button text changed to "Validate" (name changed)`);
                                }

                                console.log(`⏳ Marked for revalidation due to name change (forceRevalidation=true)`);
                            }
                        });

                        console.log(`✅ Name field listener setup for ${selector}`);
                    });
                }
            },

            /**
             * Block submission with inline field errors
             */
            blockSubmission: function (result, viewId, $form, $submitBtn, originalText) {
                console.log('🚫 Blocking submission with field errors');

                // Re-enable submit button (will be disabled by field error display)
                $submitBtn.prop('disabled', false).text(originalText);

                // Determine which field(s) have errors based on block_reason
                const blockReason = result.block_reason;

                if (blockReason === 'duplicate_company') {
                    // Handle duplicate company name
                    const duplicateField = result.duplicate_field; // "Full Name", "Short Name", or "Both"
                    const errorMessage = result.messages.block_message;
                    const viewLink = result.messages.view_link;

                    if (duplicateField === 'Full Name' || duplicateField === 'Both') {
                        this.showFieldError(viewId, 'field_992', errorMessage, viewLink);
                    }

                    if (duplicateField === 'Short Name' || duplicateField === 'Both') {
                        this.showFieldError(viewId, 'field_3783', errorMessage, viewLink);
                    }

                    // Fallback: If no duplicate_field specified, show error on company name field
                    if (!duplicateField) {
                        console.log('⚠️ No duplicate_field specified - defaulting to field_992 (company name)');
                        this.showFieldError(viewId, 'field_992', errorMessage, viewLink);
                    }

                } else if (result.email_validation && result.email_validation.action === 'block') {
                    // Handle email validation failure
                    const errorMessage = result.email_validation.message;
                    this.showFieldError(viewId, 'field_4164', errorMessage);

                } else if (blockReason === 'duplicate_phone') {
                    // Handle duplicate phone number
                    const errorMessage = result.messages.block_message;
                    const viewLink = result.messages.view_link;
                    this.showFieldError(viewId, 'field_4056', errorMessage, viewLink);

                } else if (blockReason === 'shared_contacts_not_allowed' || blockReason === 'duplicate_found' || blockReason === 'phone_only_unverifiable') {
                    // Handle shared contacts when not allowed OR duplicate communication found
                    // OR phone-only form that can't verify identity
                    // Show field-level errors for each conflicting contact
                    // BUT: shareable conflicts (phones/emails) get special orange UI with share option
                    const conflicts = result.conflicts || [];

                    console.log(`🔍 Processing ${conflicts.length} conflict(s):`, conflicts);

                    conflicts.forEach((conflict, index) => {
                        const fieldId = conflict.field_id;
                        const errorMessage = conflict.conflict_message || 'This contact detail is already in use.';
                        const viewLink = conflict.view_link || null;

                        // Check if this conflict is shareable (phone with Personal/Shared ownership)
                        if (conflict.is_shareable) {
                            console.log(`  [${index + 1}] Showing SHAREABLE phone UI for ${fieldId}`);
                            // Show orange phone sharing UI with 3 buttons
                            this.showPhoneSharingNotification(viewId, conflict, originalText);
                        } else {
                            // Regular blocking error (red)
                            console.log(`  [${index + 1}] Showing error for ${fieldId}: "${errorMessage}"`);
                            this.showFieldError(viewId, fieldId, errorMessage, viewLink);
                        }
                        console.log(`  [${index + 1}] ✓ Notification shown for ${fieldId}`);
                    });

                    // Also show general instruction if provided
                    if (result.messages && result.messages.action_instruction) {
                        console.log(`📢 ${result.messages.action_instruction}`);
                    }

                } else {
                    // Generic block - show top-level error (fallback)
                    console.warn('⚠️ Unknown block reason - showing generic error');
                    const blockMessage = result.messages?.block_message || 'Unable to process submission.';
                    this.showError(blockMessage);
                    $submitBtn.prop('disabled', false).text(originalText);
                }
            },

            /**
             * Show confirmation dialog for conflicts
             */
            showConfirmationDialog: function (result, formData, viewId, $form, $submitBtn, originalText) {
                console.log('❓ Showing inline confirmation for conflicts');

                // Check if this is the new phone sharing scenario
                if (result.confirm_reason === 'shareable_phone') {
                    this.showPhoneSharingConfirmation(result, formData, viewId, $form, $submitBtn, originalText);
                    return;
                }

                const conflicts = result.conflicts || [];
                const emailValidationWarning = result.email_validation_warning;

                // Show inline field warnings for conflicts
                if (emailValidationWarning) {
                    this.showFieldWarning(viewId, 'field_4164', `Email Validation Warning: ${emailValidationWarning}`);
                }

                // Show inline warnings for each conflict type
                conflicts.forEach(conflict => {
                    let fieldId;
                    let warningMsg;

                    // Map conflict type to field ID
                    // Use existing_entity (from our backend) or existing_contact (from Make.com) for compatibility
                    const entityName = conflict.existing_entity || conflict.existing_contact || 'another entity';
                    if (conflict.type === 'email') {
                        fieldId = 'field_4164';
                        warningMsg = `This email is already associated with <strong>${entityName}</strong>`;
                    } else if (conflict.type === 'phone') {
                        fieldId = 'field_4056';
                        warningMsg = `This phone number is already associated with <strong>${entityName}</strong>`;
                    } else if (conflict.type === 'mobile') {
                        fieldId = 'field_3960';
                        warningMsg = `This mobile number is already associated with <strong>${entityName}</strong>`;
                    }

                    if (fieldId) {
                        this.showFieldWarning(viewId, fieldId, warningMsg);
                    }
                });

                // Build confirmation message (summary of conflicts)
                let confirmMessage = '';

                // Add email validation warning summary
                if (emailValidationWarning) {
                    confirmMessage += `<p><strong>⚠️ Email Validation Warning:</strong> ${emailValidationWarning}</p>`;
                }

                // Add conflicts summary
                if (conflicts.length > 0) {
                    confirmMessage += `<p><strong>Contact conflicts detected:</strong></p><ul style="margin: 10px 0;">`;

                    conflicts.forEach(conflict => {
                        const contactMethod = conflict.type === 'mobile' ? 'Mobile' :
                            conflict.type === 'phone' ? 'Phone' : 'Email';
                        const entityName = conflict.existing_entity || conflict.existing_contact || 'another entity';
                        confirmMessage += `<li>${contactMethod}: <strong>${conflict.contact_value}</strong> is already associated with <strong>${entityName}</strong></li>`;
                    });

                    confirmMessage += '</ul>';
                }

                // Add appropriate question based on what's being confirmed
                if (conflicts.length > 0 && formData.first && formData.last) {
                    confirmMessage += `<p><strong>Do you want to associate these contact methods with ${formData.first} ${formData.last} as well?</strong></p>`;
                } else if (emailValidationWarning && conflicts.length === 0) {
                    confirmMessage += `<p><strong>Do you want to proceed with this email address anyway?</strong></p>`;
                } else if (conflicts.length > 0) {
                    confirmMessage += `<p><strong>Do you want to proceed with these shared contact methods?</strong></p>`;
                }

                // Show inline confirmation using unified notification system
                notificationSystem.showInlineConfirmation(
                    viewId,
                    confirmMessage,
                    // On confirm
                    () => {
                        this.clearAllWarnings(viewId);
                        this.proceedWithAssociation(formData, result, viewId);
                    },
                    // On cancel
                    () => {
                        this.clearAllWarnings(viewId);
                        notificationSystem.submitButton.reset(viewId);
                    },
                    {
                        confirmText: 'Yes, Associate',
                        cancelText: 'Cancel',
                        type: 'warning'
                    }
                );

                // Disable submit button while waiting for user decision
                notificationSystem.submitButton.setState(viewId, 'disabled', 'Waiting for confirmation...');
            },

            /**
             * Show phone sharing confirmation UI (orange warning with 3 options)
             * Used when a phone number is found that could be shared (Personal/Shared ownership)
             *
             * Options:
             * - View Contact: Opens the existing contact in a new tab
             * - Share Contact: Confirms sharing and allows form submission
             * - Clear Value: Clears the phone field and removes notification
             */
            showPhoneSharingConfirmation: function (result, formData, viewId, $form, $submitBtn, originalText) {
                console.log('📞 Showing phone sharing confirmation UI');

                const conflicts = result.conflicts || [];
                const sharedContactIds = result.shared_contact_ids || [];
                const messages = result.messages || {};

                // Process each shareable phone conflict
                conflicts.forEach(conflict => {
                    const fieldId = conflict.field_id;
                    const existingEntity = conflict.existing_entity;
                    const viewLink = conflict.view_link;
                    const comId = conflict.existing_com_id;

                    // Build the notification content with 3 buttons
                    const notificationMessage = `
                        <div style="margin-bottom: 10px;">
                            This phone number is already associated with <strong>${existingEntity}</strong>.
                        </div>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
                            ${viewLink ? `
                                <a href="${viewLink}" target="_blank" class="phone-share-btn phone-share-view" style="
                                    display: inline-flex;
                                    align-items: center;
                                    gap: 4px;
                                    padding: 6px 12px;
                                    background: rgba(255, 255, 255, 0.8);
                                    border: 1px solid #ffc107;
                                    border-radius: 4px;
                                    color: #856404;
                                    font-size: 12px;
                                    font-weight: 500;
                                    text-decoration: none;
                                    cursor: pointer;
                                    transition: all 0.2s ease;
                                ">
                                    <i class="fa fa-user"></i> View Contact
                                </a>
                            ` : ''}
                            <button type="button" class="phone-share-btn phone-share-confirm" data-field-id="${fieldId}" data-com-id="${comId}" style="
                                display: inline-flex;
                                align-items: center;
                                gap: 4px;
                                padding: 6px 12px;
                                background: #39b54a;
                                border: none;
                                border-radius: 4px;
                                color: white;
                                font-size: 12px;
                                font-weight: 500;
                                cursor: pointer;
                                transition: all 0.2s ease;
                            ">
                                <i class="fa fa-share-alt"></i> Share Contact
                            </button>
                            <button type="button" class="phone-share-btn phone-share-clear" data-field-id="${fieldId}" style="
                                display: inline-flex;
                                align-items: center;
                                gap: 4px;
                                padding: 6px 12px;
                                background: rgba(255, 255, 255, 0.8);
                                border: 1px solid #ccc;
                                border-radius: 4px;
                                color: #666;
                                font-size: 12px;
                                font-weight: 500;
                                cursor: pointer;
                                transition: all 0.2s ease;
                            ">
                                <i class="fa fa-times"></i> Clear Value
                            </button>
                        </div>
                    `;

                    // Show warning notification (orange) with the buttons
                    notificationSystem.showFieldNotification(viewId, fieldId, notificationMessage, 'warning');

                    // Register as pending shareable conflict (blocks submission until resolved)
                    if (!this.pendingShareableConflicts[viewId]) {
                        this.pendingShareableConflicts[viewId] = {};
                    }
                    this.pendingShareableConflicts[viewId][fieldId] = {
                        conflict: conflict,
                        comId: comId
                    };
                    console.log(`🚫 Registered pending shareable conflict for ${fieldId} - submission blocked until resolved`);

                    // Get the notification element to attach event handlers
                    const $notification = $(`#${viewId} #notification-warning-${fieldId}`);

                    // Remove any existing handlers first to prevent accumulation
                    $notification.find('.phone-share-confirm').off('click.phoneShare');
                    $notification.find('.phone-share-clear').off('click.phoneShare');
                    $notification.find('.phone-share-btn').off('mouseenter.phoneShare mouseleave.phoneShare');

                    // Handle "Share Contact" click
                    $notification.find('.phone-share-confirm').on('click.phoneShare', (e) => {
                        e.preventDefault();
                        const clickedComId = $(e.currentTarget).data('com-id');
                        const clickedFieldId = $(e.currentTarget).data('field-id');

                        console.log(`✅ User confirmed phone sharing for ${clickedFieldId}, COM ID: ${clickedComId}`);

                        // Store the shared COM ID for the post-submission payload
                        if (!window._sharedPhoneComIds) {
                            window._sharedPhoneComIds = [];
                        }
                        if (clickedComId && !window._sharedPhoneComIds.includes(clickedComId)) {
                            window._sharedPhoneComIds.push(clickedComId);
                        }

                        // Mark this phone as shared (so it won't be included in knack_api_payloads)
                        window._phoneIsShared = true;

                        // Clear the pending shareable conflict (allows submission)
                        if (this.pendingShareableConflicts[viewId]) {
                            delete this.pendingShareableConflicts[viewId][clickedFieldId];
                            console.log(`✅ Cleared pending shareable conflict for ${clickedFieldId} - user chose to share`);
                        }

                        // Clear the notification and show success
                        notificationSystem.clearFieldNotification(viewId, clickedFieldId);

                        // Show brief success message
                        notificationSystem.showFieldNotification(
                            viewId,
                            clickedFieldId,
                            'Phone will be shared with this contact.',
                            'success'
                        );

                        // Check if there are any remaining conflicts/errors
                        this.checkAndResetSubmitButton(viewId, originalText);

                        // If no more errors or pending conflicts, auto-submit the form
                        if (this.hasNoErrors(viewId)) {
                            console.log(`✅ All conflicts resolved - auto-submitting form`);

                            // Brief delay to show the success message before submitting
                            setTimeout(() => {
                                // Clear the success notification before submission
                                notificationSystem.clearFieldNotification(viewId, clickedFieldId);

                                // Set flag to skip validation (already validated)
                                window.skipValidationForSubmit = true;

                                // Trigger form submission
                                this.submitForm(viewId);
                            }, 800);
                        }
                    });

                    // Handle "Clear Value" click
                    $notification.find('.phone-share-clear').on('click.phoneShare', (e) => {
                        e.preventDefault();
                        const clickedFieldId = $(e.currentTarget).data('field-id');

                        console.log(`🧹 User chose to clear phone field ${clickedFieldId}`);

                        // Clear the field value
                        const $field = $(`#${viewId} #${clickedFieldId}, #${viewId} input[name="${clickedFieldId}"], #${viewId} [name="${clickedFieldId}"]`).first();
                        $field.val('').trigger('change');

                        // Clear the pending shareable conflict (allows submission)
                        if (this.pendingShareableConflicts[viewId]) {
                            delete this.pendingShareableConflicts[viewId][clickedFieldId];
                            console.log(`✅ Cleared pending shareable conflict for ${clickedFieldId} - user cleared the value`);
                        }

                        // Clear the notification
                        notificationSystem.clearFieldNotification(viewId, clickedFieldId);

                        // Reset phone sharing flag
                        window._phoneIsShared = false;

                        // Check if there are any remaining conflicts/errors
                        this.checkAndResetSubmitButton(viewId, originalText);
                    });

                    // Add hover effects to buttons
                    $notification.find('.phone-share-btn').on('mouseenter.phoneShare', function () {
                        $(this).css('transform', 'translateY(-1px)');
                        $(this).css('box-shadow', '0 2px 4px rgba(0,0,0,0.15)');
                    }).on('mouseleave.phoneShare', function () {
                        $(this).css('transform', 'translateY(0)');
                        $(this).css('box-shadow', 'none');
                    });
                });

                // Disable submit button while waiting for user decision
                notificationSystem.submitButton.setState(viewId, 'disabled', 'Review phone conflict...');
            },

            /**
             * Check if all conflicts are resolved and reset submit button
             */
            checkAndResetSubmitButton: function (viewId, originalText) {
                // Check if there are any remaining error or warning notifications
                const $remainingErrors = $(`#${viewId} .field-error-message`);
                const $remainingWarnings = $(`#${viewId} .field-warning-message`);

                // Don't count success messages as blocking
                const hasBlockingNotifications = $remainingErrors.length > 0 || $remainingWarnings.length > 0;

                if (!hasBlockingNotifications) {
                    console.log('✅ All conflicts resolved, enabling submit button');
                    notificationSystem.submitButton.setState(viewId, 'ready', originalText);

                    // Clear any success messages after a short delay
                    setTimeout(() => {
                        $(`#${viewId} .field-success-message`).fadeOut(300, function () {
                            $(this).remove();
                        });
                    }, 2000);
                } else {
                    console.log(`⏳ Still have ${$remainingErrors.length} errors and ${$remainingWarnings.length} warnings`);
                }
            },

            /**
             * Show phone sharing notification (orange) for a single shareable conflict
             * Called from blockSubmission when a conflict has is_shareable = true
             */
            showPhoneSharingNotification: function (viewId, conflict, originalText) {
                const fieldId = conflict.field_id;
                const existingEntity = conflict.existing_entity;
                const viewLink = conflict.view_link;
                const comId = conflict.existing_com_id;

                console.log(`📞 Showing phone sharing notification for ${fieldId}`, conflict);

                // Build the notification content with 3 buttons
                const notificationMessage = `
                    <div style="margin-bottom: 10px;">
                        This phone number is already associated with <strong>${existingEntity}</strong>.
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
                        ${viewLink ? `
                            <a href="${viewLink}" target="_blank" class="phone-share-btn phone-share-view" style="
                                display: inline-flex;
                                align-items: center;
                                gap: 4px;
                                padding: 6px 12px;
                                background: rgba(255, 255, 255, 0.8);
                                border: 1px solid #ffc107;
                                border-radius: 4px;
                                color: #856404;
                                font-size: 12px;
                                font-weight: 500;
                                text-decoration: none;
                                cursor: pointer;
                                transition: all 0.2s ease;
                            ">
                                <i class="fa fa-user"></i> View Contact
                            </a>
                        ` : ''}
                        <button type="button" class="phone-share-btn phone-share-confirm" data-field-id="${fieldId}" data-com-id="${comId}" style="
                            display: inline-flex;
                            align-items: center;
                            gap: 4px;
                            padding: 6px 12px;
                            background: #39b54a;
                            border: none;
                            border-radius: 4px;
                            color: white;
                            font-size: 12px;
                            font-weight: 500;
                            cursor: pointer;
                            transition: all 0.2s ease;
                        ">
                            <i class="fa fa-share-alt"></i> Share Contact
                        </button>
                        <button type="button" class="phone-share-btn phone-share-clear" data-field-id="${fieldId}" style="
                            display: inline-flex;
                            align-items: center;
                            gap: 4px;
                            padding: 6px 12px;
                            background: rgba(255, 255, 255, 0.8);
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            color: #666;
                            font-size: 12px;
                            font-weight: 500;
                            cursor: pointer;
                            transition: all 0.2s ease;
                        ">
                            <i class="fa fa-times"></i> Clear Value
                        </button>
                    </div>
                `;

                // Show warning notification (orange) with the buttons
                notificationSystem.showFieldNotification(viewId, fieldId, notificationMessage, 'warning');

                // Store this conflict in _problematicValues so we can re-show it if user re-enters same value
                // This is different from regular errors - we store the full conflict object for shareable phones
                if (!window._problematicValues) {
                    window._problematicValues = {};
                }
                if (!window._problematicValues[viewId]) {
                    window._problematicValues[viewId] = {};
                }

                // Get the current phone value to store as the problematic value
                const $phoneField = $(`#${viewId} #${fieldId}, #${viewId} input[name="${fieldId}"]`).first();
                const phoneValue = $phoneField.val() || '';

                window._problematicValues[viewId][fieldId] = {
                    value: phoneValue,
                    message: conflict.conflict_message,
                    viewLink: viewLink,
                    is_shareable: true,  // Flag to indicate this needs phone sharing UI
                    conflict: conflict   // Store full conflict for re-display
                };
                console.log(`📝 Stored shareable phone conflict for ${fieldId}: "${phoneValue}"`);

                // Register as pending shareable conflict (blocks submission until resolved)
                if (!this.pendingShareableConflicts[viewId]) {
                    this.pendingShareableConflicts[viewId] = {};
                }
                this.pendingShareableConflicts[viewId][fieldId] = {
                    conflict: conflict,
                    phoneValue: phoneValue
                };
                console.log(`🚫 Registered pending shareable conflict for ${fieldId} - submission blocked until resolved`);

                // Disable submit button while conflict is pending
                this.disableSubmit(viewId);

                // Get the notification element to attach event handlers
                const $notification = $(`#${viewId} #notification-warning-${fieldId}`);
                const self = this;

                // Remove any existing handlers first to prevent accumulation
                $notification.find('.phone-share-confirm').off('click.phoneShare');
                $notification.find('.phone-share-clear').off('click.phoneShare');
                $notification.find('.phone-share-btn').off('mouseenter.phoneShare mouseleave.phoneShare');

                // Handle "Share Contact" click
                $notification.find('.phone-share-confirm').on('click.phoneShare', function (e) {
                    e.preventDefault();
                    const clickedComId = $(this).data('com-id');
                    const clickedFieldId = $(this).data('field-id');

                    console.log(`✅ User confirmed phone sharing for ${clickedFieldId}, COM ID: ${clickedComId}`);

                    // Store the shared COM ID for the post-submission payload
                    if (!window._sharedPhoneComIds) {
                        window._sharedPhoneComIds = [];
                    }
                    if (clickedComId && !window._sharedPhoneComIds.includes(clickedComId)) {
                        window._sharedPhoneComIds.push(clickedComId);
                    }

                    // Mark this phone as shared (so it won't be included in knack_api_payloads)
                    window._phoneIsShared = true;

                    // Clear the pending shareable conflict (allows submission)
                    if (self.pendingShareableConflicts[viewId]) {
                        delete self.pendingShareableConflicts[viewId][clickedFieldId];
                        console.log(`✅ Cleared pending shareable conflict for ${clickedFieldId} - user chose to share`);
                    }

                    // Clear the notification and show success
                    notificationSystem.clearFieldNotification(viewId, clickedFieldId);

                    // Show brief success message
                    notificationSystem.showFieldNotification(
                        viewId,
                        clickedFieldId,
                        'Phone will be shared with this contact.',
                        'success'
                    );

                    // Check if there are any remaining conflicts/errors and reset submit button
                    self.checkAndResetSubmitButton(viewId, originalText);

                    // If no more errors or pending conflicts, auto-submit the form
                    if (self.hasNoErrors(viewId)) {
                        console.log(`✅ All conflicts resolved - auto-submitting form`);

                        // Brief delay to show the success message before submitting
                        setTimeout(() => {
                            // Clear the success notification before submission
                            notificationSystem.clearFieldNotification(viewId, clickedFieldId);

                            // Set flag to skip validation (already validated)
                            window.skipValidationForSubmit = true;

                            // Trigger form submission
                            self.submitForm(viewId);
                        }, 800);
                    }
                });

                // Handle "Clear Value" click
                $notification.find('.phone-share-clear').on('click.phoneShare', function (e) {
                    e.preventDefault();
                    const clickedFieldId = $(this).data('field-id');

                    console.log(`🧹 User chose to clear phone field ${clickedFieldId}`);

                    // Clear the field value
                    const $field = $(`#${viewId} #${clickedFieldId}, #${viewId} input[name="${clickedFieldId}"], #${viewId} [name="${clickedFieldId}"]`).first();
                    $field.val('').trigger('change');

                    // Clear the pending shareable conflict (allows submission)
                    if (self.pendingShareableConflicts[viewId]) {
                        delete self.pendingShareableConflicts[viewId][clickedFieldId];
                        console.log(`✅ Cleared pending shareable conflict for ${clickedFieldId} - user cleared the value`);
                    }

                    // Clear the notification
                    notificationSystem.clearFieldNotification(viewId, clickedFieldId);

                    // Reset phone sharing flag
                    window._phoneIsShared = false;

                    // Check if there are any remaining conflicts/errors
                    self.checkAndResetSubmitButton(viewId, originalText);
                });

                // Add hover effects to buttons
                $notification.find('.phone-share-btn').on('mouseenter.phoneShare', function () {
                    $(this).css('transform', 'translateY(-1px)');
                    $(this).css('box-shadow', '0 2px 4px rgba(0,0,0,0.15)');
                }).on('mouseleave.phoneShare', function () {
                    $(this).css('transform', 'translateY(0)');
                    $(this).css('box-shadow', 'none');
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

                // IMPORTANT: Capture current form data before submission
                // This data will be used in post-submission webhook since form will be gone after redirect
                const formData = eventListeners.extractFormData(viewId);
                window._preSubmissionFormData = formData;
                console.log(`💾 Stored form data for post-submission webhook:`, formData);

                // Clear change detection state - form is being submitted successfully
                changeTracker.clearValidationState(viewId);

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
             * Show generic error message (toast-style notification)
             * Used for system-level errors, not field-specific validation
             */
            showError: function (message) {
                const colors = typeof notificationSystem !== 'undefined'
                    ? notificationSystem.colors.error
                    : { text: '#d32f2f', background: '#ffebee', border: '#d32f2f' };

                const $errorDiv = $(`
                    <div class="generic-error-toast" style="
                        position: fixed;
                        top: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 10000;
                        background-color: ${colors.background};
                        border: 2px solid ${colors.border};
                        border-radius: 4px;
                        padding: 15px 20px;
                        color: ${colors.text};
                        font-weight: bold;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        max-width: 500px;
                        text-align: center;
                    ">
                        ❌ ${message}
                    </div>
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
            companies: [
                'AA Group', 'Ace Industries', 'Advanced Building Solutions', 'Alpha Construction',
                'Apex Property Services', 'Atlas Developments', 'Beta Solutions', 'Bright Star Cleaning',
                'BuildRight Constructions', 'Castle Rock Builders', 'Coastal Services', 'Crown Property Group',
                'Delta Group', 'Diamond Facilities', 'Elite Systems', 'Emerald Maintenance',
                'Empire Building Services', 'First Choice Solutions', 'Fortress Security', 'Frontier Tech',
                'Global Partners', 'Golden Gate Properties', 'Greenlight Services', 'Guardian Facilities',
                'Heritage Constructions', 'Horizon Enterprises', 'Industrial Solutions Ltd', 'Innovation Labs',
                'Jupiter Corporation', 'Keystone Co', 'Landmark Developments', 'Liberty Construction',
                'Maximus Property Services', 'Metro Facilities', 'Mountain View Builders', 'Nationwide Solutions',
                'Nova Construction Group', 'Omega Services', 'Pacific Building Solutions', 'Peak Performance Facilities',
                'Pinnacle Property Group', 'Premier Building Services', 'Prime Constructions', 'Quantum Solutions',
                'Redstone Developments', 'Royal Building Group', 'Sapphire Services', 'Silverline Construction',
                'Skyline Property Services', 'Summit Facilities', 'Supreme Building Solutions', 'Titan Construction Group',
                'United Property Services', 'Universal Facilities', 'Victory Building Group', 'Zenith Developments'
            ],
            melbourneAddresses: [
                { street: '123 Collins Street', city: 'Melbourne', state: 'VIC', zip: '3000' },
                { street: '456 Bourke Street', city: 'Melbourne', state: 'VIC', zip: '3000' },
                { street: '789 Swanston Street', city: 'Melbourne', state: 'VIC', zip: '3000' },
                { street: '45 Exhibition Street', city: 'Melbourne', state: 'VIC', zip: '3000' },
                { street: '67 La Trobe Street', city: 'Melbourne', state: 'VIC', zip: '3000' },
                { street: '234 Queen Street', city: 'Melbourne', state: 'VIC', zip: '3000' },
                { street: '567 Lonsdale Street', city: 'Melbourne', state: 'VIC', zip: '3000' },
                { street: '890 Flinders Street', city: 'Melbourne', state: 'VIC', zip: '3000' },
                { street: '12 Spencer Street', city: 'Melbourne', state: 'VIC', zip: '3000' },
                { street: '345 William Street', city: 'Melbourne', state: 'VIC', zip: '3000' },
                { street: '78 Chapel Street', city: 'South Yarra', state: 'VIC', zip: '3141' },
                { street: '156 Toorak Road', city: 'South Yarra', state: 'VIC', zip: '3141' },
                { street: '234 Bridge Road', city: 'Richmond', state: 'VIC', zip: '3121' },
                { street: '89 Brunswick Street', city: 'Fitzroy', state: 'VIC', zip: '3065' },
                { street: '456 Sydney Road', city: 'Brunswick', state: 'VIC', zip: '3056' },
                { street: '123 High Street', city: 'Northcote', state: 'VIC', zip: '3070' },
                { street: '678 Glen Eira Road', city: 'Caulfield', state: 'VIC', zip: '3162' },
                { street: '234 Nepean Highway', city: 'Brighton', state: 'VIC', zip: '3186' },
                { street: '567 Heidelberg Road', city: 'Alphington', state: 'VIC', zip: '3078' },
                { street: '890 Plenty Road', city: 'Preston', state: 'VIC', zip: '3072' }
            ],

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
             * Generates random Melbourne address
             */
            randomMelbourneAddress: function () {
                return this.melbourneAddresses[Math.floor(Math.random() * this.melbourneAddresses.length)];
            },

            /**
             * Generates company short name from full name
             */
            generateShortName: function (companyName) {
                // Remove common suffixes
                const cleanName = companyName
                    .replace(/\s+(Pty\s+)?Ltd\.?$/i, '')
                    .replace(/\s+Group$/i, '')
                    .replace(/\s+Services$/i, '')
                    .replace(/\s+Solutions$/i, '')
                    .replace(/\s+Construction$/i, '')
                    .replace(/\s+Constructions$/i, '')
                    .trim();

                // Create initials or truncated name
                const words = cleanName.split(' ');
                if (words.length > 1) {
                    // Use initials for multi-word names
                    return words.map(w => w[0]).join('').toUpperCase();
                } else {
                    // Use first 3-5 characters for single word
                    return cleanName.substring(0, Math.min(5, cleanName.length));
                }
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
                let companyName = null;  // Store for use in short-name rule

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
                            companyName = this.randomCompany();
                            $(fieldConfig.selector).val(companyName).trigger('blur');
                            console.log(`✓ Prefilled text: ${companyName}`);
                            break;

                        case 'short-name':
                            if (companyName) {
                                const shortName = this.generateShortName(companyName);
                                $(fieldConfig.selector).val(shortName).trigger('blur');
                                console.log(`✓ Prefilled short name: ${shortName}`);
                            }
                            break;

                        case 'entity-type':
                            // Always set to "Company" for test purposes
                            $(fieldConfig.selector).val('Company').trigger('change');
                            console.log(`✓ Set entity type: Company`);
                            break;

                        case 'melbourne-address':
                            const address = this.randomMelbourneAddress();
                            $(fieldConfig.selectors.street).val(address.street).trigger('input');
                            $(fieldConfig.selectors.city).val(address.city).trigger('input');
                            $(fieldConfig.selectors.state).val(address.state).trigger('input');
                            $(fieldConfig.selectors.zip).val(address.zip).trigger('input');
                            console.log(`✓ Prefilled address: ${address.street}, ${address.city} ${address.state} ${address.zip}`);
                            break;

                        case 'company-email':
                            const compEmail = companyName ?
                                `info@${companyName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com.au` :
                                `info@${this.randomCompany().toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com.au`;
                            $(fieldConfig.selector).val(compEmail).trigger('input');
                            console.log(`✓ Prefilled company email: ${compEmail}`);
                            break;

                        case 'company-phone':
                            const compPhone = this.randomLandline();
                            $(fieldConfig.selector).val(compPhone).trigger('blur');
                            console.log(`✓ Prefilled company phone: ${compPhone}`);
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

                // Add click handler - use testDataGenerator object directly
                $button.find('.test-data-prefill-btn').on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`🎲 Fill Test Data button clicked for ${viewId}`);

                    // Call prefillForm directly on the testDataGenerator object
                    testDataGenerator.prefillForm(viewId);
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

                    // Setup field error listeners for this view
                    $(document).on(`knack-view-render.${viewId}`, function (event, view) {
                        duplicateHandler.setupFieldErrorListeners(viewId);
                    });

                    // Use before-submit event for async duplicate checking
                    $(document).on(`knack-form-before-submit.${viewId}`, function (event, view) {
                        console.log(`📋 Before form submission for ${viewId} - running validation and duplicate check`);

                        // Check if we should skip validation (already validated via duplicate check)
                        if (window.skipValidationForSubmit) {
                            console.log(`⏭️ Skipping validation for ${viewId} - already validated via duplicate check`);
                            return true; // Allow normal submission
                        }

                        // Check if there are any field errors still present
                        if (!duplicateHandler.hasNoErrors(viewId)) {
                            console.log(`🚫 Cannot submit - field errors still exist for ${viewId}`);
                            event.preventDefault();
                            event.stopImmediatePropagation();

                            // Focus the first error field
                            const firstErrorField = Object.keys(duplicateHandler.fieldErrors[viewId])[0];
                            if (firstErrorField) {
                                $(`#${viewId} #${firstErrorField}, #${viewId} input[name="${firstErrorField}"]`).first().focus();
                            }
                            return false;
                        }

                        // Check if revalidation is needed due to field changes
                        const needsRevalidation = changeTracker.needsRevalidation(viewId);
                        const hasBeenValidated = !!changeTracker.validatedValues[viewId];
                        const needsPreSubmission = changeTracker.needsPreSubmissionValidation(viewId);

                        console.log(`📊 Before-submit decision: hasBeenValidated=${hasBeenValidated}, needsRevalidation=${needsRevalidation}, needsPreSubmission=${needsPreSubmission}`);

                        // For update forms: Skip pre-submission if no COM fields have new non-empty values
                        // This handles: deletions, reverting to original, or no COM changes
                        if (!needsPreSubmission) {
                            console.log(`✅ No pre-submission validation needed - submitting directly`);

                            // Capture form data before submission for post-submission webhook
                            const formData = eventListeners.extractFormData(viewId);
                            window._preSubmissionFormData = formData;
                            console.log(`💾 Stored form data for direct submission:`, formData);

                            // Clear validation state since we're submitting
                            changeTracker.clearValidationState(viewId);

                            // Allow normal Knack submission
                            window.skipValidationForSubmit = true;
                            return true;
                        }

                        // If previously validated AND no revalidation needed → submit directly
                        if (hasBeenValidated && !needsRevalidation) {
                            console.log(`✅ Previously validated and no revalidation needed - submitting directly`);

                            // Capture form data before submission for post-submission webhook
                            const formData = eventListeners.extractFormData(viewId);
                            window._preSubmissionFormData = formData;
                            console.log(`💾 Stored form data for direct submission:`, formData);

                            // Clear validation state since we're submitting
                            changeTracker.clearValidationState(viewId);

                            // Allow normal Knack submission
                            window.skipValidationForSubmit = true;
                            return true;
                        }

                        if (needsRevalidation) {
                            console.log(`🔄 Revalidation required - user changed critical fields after previous validation`);

                            // Get summary of what changed
                            const summary = changeTracker.getChangesSummary(viewId);
                            console.log(`   Reasons: ${summary.reasons.join(', ')}`);

                            // Clear previous validation state to allow fresh validation
                            changeTracker.clearValidationState(viewId);

                            // Fall through to run webhook validation again
                            // The informative message will be shown in the button text
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

                        // Show loading state with informative message
                        const $form = $(`#${viewId} form`);
                        const $submitBtn = $form.find('button[type="submit"]');
                        const originalText = $submitBtn.text();

                        $submitBtn.prop('disabled', true).text('Validating...');

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

                                // Show more specific error message
                                const errorMessage = typeof error === 'string' && error.includes('not configured')
                                    ? error
                                    : 'Unable to process form submission. Please try again.';
                                duplicateHandler.showError(errorMessage);
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

                        // Check if there are any field errors still present
                        if (!duplicateHandler.hasNoErrors(viewId)) {
                            console.log(`🚫 Cannot submit via button click - field errors still exist for ${viewId}`);
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            return false;
                        }

                        // === DECISION TREE FOR UPDATE FORMS ===
                        // Check if revalidation is needed due to field changes
                        const needsRevalidation = changeTracker.needsRevalidation(viewId);
                        const hasBeenValidated = !!changeTracker.validatedValues[viewId];
                        const needsPreSubmission = changeTracker.needsPreSubmissionValidation(viewId);

                        console.log(`📊 Decision tree check: hasBeenValidated=${hasBeenValidated}, needsRevalidation=${needsRevalidation}, needsPreSubmission=${needsPreSubmission}`);

                        // For update forms: Skip pre-submission if no COM fields have new non-empty values
                        // This handles: deletions, reverting to original, or no COM changes
                        if (!needsPreSubmission) {
                            console.log(`✅ No pre-submission validation needed - allowing direct Knack submission`);

                            // Capture form data before submission for post-submission webhook
                            const formData = eventListeners.extractFormData(viewId);
                            window._preSubmissionFormData = formData;
                            console.log(`💾 Stored form data for direct submission:`, formData);

                            // Clear validation state since we're submitting
                            changeTracker.clearValidationState(viewId);

                            // Allow normal Knack submission - don't prevent default
                            window.skipValidationForSubmit = true;
                            return true;
                        }

                        // If previously validated AND no revalidation needed → submit directly to Knack
                        if (hasBeenValidated && !needsRevalidation) {
                            console.log(`✅ Previously validated and no revalidation needed - allowing direct Knack submission`);

                            // Capture form data before submission for post-submission webhook
                            const formData = eventListeners.extractFormData(viewId);
                            window._preSubmissionFormData = formData;
                            console.log(`💾 Stored form data for direct submission:`, formData);

                            // Clear validation state since we're submitting
                            changeTracker.clearValidationState(viewId);

                            // Allow normal Knack submission - don't prevent default
                            window.skipValidationForSubmit = true;
                            return true;
                        }

                        console.log(`✅ Submit button validation passed for ${viewId} - checking for duplicates`);

                        // Prevent the click from proceeding - we'll handle submission async
                        e.preventDefault();
                        e.stopImmediatePropagation();

                        // Extract form data for duplicate checking
                        const formData = eventListeners.extractFormData(viewId);

                        // Show loading state with informative message
                        const $form = $(`#${viewId} form`);
                        const $submitBtn = $(e.currentTarget);
                        const originalText = $submitBtn.text();

                        $submitBtn.prop('disabled', true).text('Validating...');

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

                                // Show more specific error message
                                const errorMessage = typeof error === 'string' && error.includes('not configured')
                                    ? error
                                    : 'Unable to process form submission. Please try again.';
                                duplicateHandler.showError(errorMessage);
                            });

                        return false;
                    });
                });
            },

            /**
             * Validates prefilled fields on initial render
             */
            validatePrefilledFields: function (viewId) {
                const config = viewConfigs[viewId];
                if (!config || !config.fields) return;

                console.log(`🔍 Checking prefilled fields for ${viewId}`);

                for (const fieldId in config.fields) {
                    const fieldConfig = config.fields[fieldId];
                    if (!fieldConfig.rule) continue;

                    const ruleDefinition = validationRuleTypes[fieldConfig.rule];
                    if (!ruleDefinition) continue;

                    // Get field value
                    const $field = fieldConfig.selector ? $(fieldConfig.selector) : null;
                    if (!$field || $field.length === 0) continue;

                    const fieldValue = $field.val() || '';

                    // Only validate if field has a value (is prefilled)
                    if (!fieldValue || fieldValue.trim() === '') continue;

                    console.log(`🔍 Validating prefilled field ${fieldId} with value: '${fieldValue}'`);

                    // Run validation
                    const result = ruleDefinition.validate(fieldConfig, fieldValue, $field);

                    // Handle warnings for company-name
                    if (fieldConfig.rule === 'company-name' && result.isValid) {
                        if (result.hasWarning && result.warningMessage && ruleDefinition.displayWarning) {
                            ruleDefinition.displayWarning(fieldId, result.warningMessage, utils);
                            console.log(`⚠️ Warning shown for prefilled ${fieldId}: ${result.warningMessage}`);
                        }
                    }

                    // Show errors for invalid prefilled fields
                    if (!result.isValid) {
                        const errorMessage = result.errorMessage || fieldConfig.message || ruleDefinition.defaultMessage;
                        utils.addFieldError(fieldId, errorMessage, null, viewId);
                        console.log(`❌ Error shown for prefilled ${fieldId}: ${errorMessage}`);
                    }
                }
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
                                // Only blur - don't use 'input' as it strips spaces while user is typing
                                events = 'blur';
                                selectors = `${fieldConfig.selectors.first}, ${fieldConfig.selectors.last}`;
                                break;
                            case 'mobile-number':
                            case 'landline-number':
                            case 'company-phone':
                            case 'proper-case-text':
                            case 'company-name':
                            case 'short-name':
                            case 'entity-type':
                                events = 'blur';
                                selectors = fieldConfig.selector;
                                break;
                            case 'company-email':
                                events = 'blur';
                                selectors = fieldConfig.selector;
                                break;
                            case 'melbourne-address':
                                events = 'blur';
                                selectors = Object.values(fieldConfig.selectors).join(', ');
                                break;
                            case 'contact-group':
                                // Skip - contact-group validation only runs on form submission
                                // Individual field format validation handles blur events
                                events = null;
                                selectors = null;
                                break;
                            default:
                                events = 'blur';
                                selectors = fieldConfig.selector;
                        }

                        // Skip event listener setup if events is null (e.g., contact-group)
                        if (!events || !selectors) {
                            continue;
                        }

                        $(document).on(events, selectors, function () {
                            fieldTracker.markFieldInteracted(viewId, fieldId);
                            if (fieldTracker.hasFieldBeenInteracted(viewId, fieldId)) {
                                // Get field value - handle both single selector and multiple selectors
                                const $field = fieldConfig.selector ? $(fieldConfig.selector) : $(this);
                                const rawFieldValue = $field.val() || '';
                                const fieldValue = rawFieldValue.trim();

                                // IMMEDIATE TRIM: Update field if it has leading/trailing whitespace
                                // This ensures fields are trimmed on blur regardless of validation outcome
                                if (rawFieldValue !== fieldValue) {
                                    $field.val(fieldValue);
                                    console.log(`✂️ Trimmed whitespace from ${fieldId}: '${rawFieldValue}' → '${fieldValue}'`);
                                }

                                const webhookSystem = window._formValidationWebhookSystem;
                                const currentValue = fieldValue.toLowerCase();

                                // FUNDAMENTAL RULE #1: If field has an error notification, check if value has changed
                                // This applies to ALL error notifications, not just webhook errors
                                if (webhookSystem && webhookSystem.lastErrorValues &&
                                    webhookSystem.lastErrorValues[viewId] &&
                                    webhookSystem.lastErrorValues[viewId][fieldId]) {

                                    const lastErrorValue = (webhookSystem.lastErrorValues[viewId][fieldId] || '').toLowerCase();

                                    console.log(`🔍 Blur check for ${fieldId} with existing error:`, {
                                        currentValue: currentValue,
                                        lastErrorValue: lastErrorValue,
                                        match: currentValue === lastErrorValue
                                    });

                                    if (currentValue === lastErrorValue) {
                                        // Value hasn't changed from when error was shown - keep error visible, skip validation
                                        console.log(`⏭️ Skipping validation for ${fieldId} - value unchanged from last error`);
                                        return;
                                    }
                                }

                                // FUNDAMENTAL RULE #2: Check if this value matches a known problematic value (from webhook)
                                // Even if error was cleared, re-show it if user re-enters the problematic value
                                if (window._problematicValues && window._problematicValues[viewId] && window._problematicValues[viewId][fieldId]) {
                                    const problematicValue = window._problematicValues[viewId][fieldId];
                                    const errorValue = (problematicValue.value || '').toLowerCase();

                                    console.log(`🔍 Checking for problematic value match:`, {
                                        currentValue: currentValue,
                                        problematicValue: errorValue,
                                        match: currentValue === errorValue
                                    });

                                    if (currentValue === errorValue && currentValue !== '') {
                                        // Current value matches the problematic value - ALWAYS show error and skip validation
                                        console.log(`⚠️ Problematic value detected for ${fieldId} - ensuring error is visible`);
                                        console.log(`   Field value before error show: "${$field.val()}"`);
                                        console.log(`   Problematic value is_shareable: ${problematicValue.is_shareable}`);

                                        // Check if this is a shareable phone conflict
                                        if (problematicValue.is_shareable && problematicValue.conflict) {
                                            // Check if phone sharing notification is already showing
                                            const $existingWarning = $(`#${viewId} #notification-warning-${fieldId}`);
                                            if (!$existingWarning.length || !$existingWarning.is(':visible')) {
                                                console.log(`   📞 Re-showing phone sharing notification for shareable conflict`);
                                                // Get original submit button text for callback
                                                const $submitBtn = $(`#${viewId} button[type="submit"]`);
                                                const originalText = $submitBtn.data('original-text') || 'Submit';
                                                // Show phone sharing notification (orange with buttons)
                                                if (typeof duplicateHandler !== 'undefined' && duplicateHandler.showPhoneSharingNotification) {
                                                    duplicateHandler.showPhoneSharingNotification(viewId, problematicValue.conflict, originalText);
                                                }
                                            } else {
                                                console.log(`   Phone sharing notification already visible for ${fieldId}`);
                                            }
                                        } else {
                                            // Regular error - show red error notification
                                            const hasFieldError = webhookSystem && webhookSystem.fieldErrors &&
                                                webhookSystem.fieldErrors[viewId] && webhookSystem.fieldErrors[viewId][fieldId];
                                            if (!hasFieldError && webhookSystem && typeof webhookSystem.showFieldError === 'function') {
                                                // Error not showing - show it (only if webhookSystem is available)
                                                console.log(`   Re-showing error for ${fieldId}`);
                                                webhookSystem.showFieldError(viewId, fieldId, problematicValue.message, problematicValue.viewLink);
                                                console.log(`   Field value after error show: "${$field.val()}"`);
                                            } else if (!hasFieldError) {
                                                // webhookSystem not available yet - try using duplicateHandler directly
                                                console.log(`   webhookSystem not ready, trying duplicateHandler for ${fieldId}`);
                                                if (typeof duplicateHandler !== 'undefined' && duplicateHandler.showFieldError) {
                                                    duplicateHandler.showFieldError(viewId, fieldId, problematicValue.message, problematicValue.viewLink);
                                                }
                                            } else {
                                                console.log(`   Error already visible for ${fieldId}`);
                                            }
                                        }

                                        // SKIP validation entirely - this value is known to be problematic
                                        return;
                                    }
                                }

                                console.log(`🔍 Validating ${fieldId} (${fieldConfig.rule}) on ${events}`);

                                // Value is different - clear any webhook error and proceed with validation
                                if (webhookSystem && webhookSystem.fieldErrors &&
                                    webhookSystem.fieldErrors[viewId] &&
                                    webhookSystem.fieldErrors[viewId][fieldId]) {
                                    console.log(`✅ Clearing webhook error for ${fieldId} - value is different`);
                                    delete webhookSystem.fieldErrors[viewId][fieldId];
                                }

                                // Also clear lastErrorValue since we're about to validate
                                if (webhookSystem && webhookSystem.lastErrorValues &&
                                    webhookSystem.lastErrorValues[viewId] &&
                                    webhookSystem.lastErrorValues[viewId][fieldId]) {
                                    delete webhookSystem.lastErrorValues[viewId][fieldId];
                                }

                                // Run validation
                                const result = ruleDefinition.validate(fieldConfig, fieldValue, $field);

                                if (result.isValid) {
                                    utils.removeFieldError(fieldId, null, viewId);

                                    // Update field with normalized value if provided
                                    // Skip for address fields (they handle normalization internally)
                                    if (result.normalizedValue &&
                                        result.normalizedValue !== fieldValue &&
                                        fieldConfig.rule !== 'melbourne-address' &&
                                        typeof result.normalizedValue === 'string') {
                                        $field.val(result.normalizedValue);
                                        console.log(`🔄 Field ${fieldId} normalized on interaction: ${result.normalizedValue}`);
                                    }

                                    // Handle special cases for certain rule types
                                    if (fieldConfig.rule === 'landline-number' || fieldConfig.rule === 'company-phone') {
                                        utils.removeConfirmationMessage(fieldId, null, viewId);
                                        if (result.hasAreaCodeCorrection) {
                                            utils.addConfirmationMessage(fieldId, 'Please confirm area code', null, viewId);
                                            console.log(`🟢 Area code confirmation shown for ${fieldId} in ${viewId}`);
                                        }
                                    }

                                    // Handle warnings for company-name
                                    if (fieldConfig.rule === 'company-name') {
                                        if (result.hasWarning && result.warningMessage && ruleDefinition.displayWarning) {
                                            ruleDefinition.displayWarning(fieldId, result.warningMessage, utils);
                                            console.log(`⚠️ Warning shown for ${fieldId}: ${result.warningMessage}`);
                                        } else if (ruleDefinition.clearWarning) {
                                            ruleDefinition.clearWarning(fieldId, utils);
                                        }
                                    }

                                    console.log(`✅ Real-time validation passed for ${fieldId}`);
                                } else {
                                    // Validation failed - show error
                                    const errorMessage = result.errorMessage || fieldConfig.message || ruleDefinition.defaultMessage;
                                    utils.addFieldError(fieldId, errorMessage, null, viewId);
                                    console.log(`❌ Real-time validation failed for ${fieldId}: ${errorMessage}`);
                                }
                            }
                        });
                    }
                });
            },

            /**
             * Sets up listeners to normalize address fields after Google Maps autocomplete
             * Knack uses Google Places API which fills fields without triggering blur events
             * Now conditional - only sets up listeners for views that have address fields
             * and registers view render handlers instead of trying to find fields immediately
             */
            setupAddressAutocompleteListeners: function () {
                // Find views that have address fields and register render handlers for them
                Object.keys(viewConfigs).forEach(viewId => {
                    const config = viewConfigs[viewId];
                    if (!config || !config.fields) return;

                    // Check if this view has an address field
                    const hasAddressField = Object.keys(config.fields).some(fieldId => {
                        return config.fields[fieldId].rule === 'melbourne-address';
                    });

                    if (!hasAddressField) return;

                    // Register a render handler for this view
                    $(document).on(`knack-view-render.${viewId}`, function (event, view) {
                        eventListeners.setupAddressAutocompleteForView(viewId);
                    });

                    console.log(`📋 Registered address autocomplete handler for ${viewId}`);
                });
            },

            /**
             * Sets up address autocomplete listeners for a specific view
             * Called when the view is actually rendered
             */
            setupAddressAutocompleteForView: function (viewId) {
                const config = viewConfigs[viewId];
                if (!config || !config.fields) return;

                // Find address fields
                for (const fieldId in config.fields) {
                    const fieldConfig = config.fields[fieldId];
                    if (fieldConfig.rule !== 'melbourne-address') continue;

                    const selectors = fieldConfig.selectors;
                    console.log(`🗺️ Setting up autocomplete listeners for address in ${viewId}`);

                    // Monitor all address input fields for changes using MutationObserver
                    // This catches Google Maps autocomplete which changes value without triggering events
                    Object.keys(selectors).forEach(subField => {
                        const selector = selectors[subField];
                        const $field = $(`#${viewId} ${selector}, ${selector}`).first();

                        if ($field.length === 0) {
                            console.log(`⚠️ Address field ${subField} not found in ${viewId}: ${selector}`);
                            return;
                        }

                        // Namespace the event to avoid duplicate bindings on re-render
                        const eventNamespace = `addressAutoComplete.${viewId}.${subField}`;
                        $(document).off(`input.${eventNamespace} change.${eventNamespace}`, selector);

                        // Use input event to catch autocomplete changes
                        // Google autocomplete triggers 'input' event when filling fields
                        $(document).on(`input.${eventNamespace} change.${eventNamespace}`, selector, function () {
                            console.log(`🗺️ Address field ${subField} changed, scheduling normalization`);

                            // Debounce the normalization to avoid multiple rapid triggers
                            clearTimeout(window.addressNormalizationTimer);
                            window.addressNormalizationTimer = setTimeout(() => {
                                console.log(`🗺️ Running address normalization after autocomplete for ${viewId}`);
                                eventListeners.normalizeAddressFieldsAfterAutocomplete(viewId, fieldId, fieldConfig);
                            }, 500); // Wait 500ms after last change
                        });

                        console.log(`✓ Autocomplete listener added for ${subField}: ${selector}`);
                    });
                }
            },

            /**
             * Normalizes address fields after autocomplete fills them
             */
            normalizeAddressFieldsAfterAutocomplete: function (viewId, fieldId, fieldConfig) {
                const ruleDefinition = validationRuleTypes['melbourne-address'];
                if (!ruleDefinition) return;

                // Get current field values
                const selectors = fieldConfig.selectors;
                const streetRaw = $(selectors.street).val() || '';
                const street2Raw = $(selectors.street2).val() || '';
                const cityRaw = $(selectors.city).val() || '';
                const stateRaw = $(selectors.state).val() || '';
                const zipRaw = $(selectors.zip).val() || '';

                console.log(`🗺️ Autocomplete filled values - Street: '${streetRaw}', City: '${cityRaw}', State: '${stateRaw}'`);

                // Run the validation which also normalizes
                const result = ruleDefinition.validate(fieldConfig, null, null);

                if (result.isValid && result.normalizedValue) {
                    console.log(`✅ Address normalized after autocomplete`);
                    // The normalization is already applied by the validate function
                } else {
                    console.log(`⚠️ Address normalization skipped - empty or invalid`);
                }
            },

            /**
             * Extracts form data for webhook payload
             */
            extractFormData: function (viewId) {
                console.log(`📋 Extracting form data for ${viewId}`);
                const formData = {};
                const config = viewConfigs[viewId];

                if (!config || !config.fields) {
                    console.warn(`⚠️ No config or fields found for ${viewId}`);
                    return formData;
                }

                for (const fieldId in config.fields) {
                    const fieldConfig = config.fields[fieldId];
                    console.log(`  - Field ${fieldId} (${fieldConfig.rule})`);

                    switch (fieldConfig.rule) {
                        case 'checkbox-required':
                            const selectedValues = [];
                            $(fieldConfig.selector + ':checked').each(function () {
                                selectedValues.push($(this).val());
                            });
                            formData[fieldId] = selectedValues;
                            console.log(`    ✓ Extracted checkbox values:`, selectedValues);
                            break;

                        case 'name-fields':
                            formData[fieldId] = {
                                first: $(fieldConfig.selectors.first).val().trim(),
                                last: $(fieldConfig.selectors.last).val().trim()
                            };
                            console.log(`    ✓ Extracted name:`, formData[fieldId]);
                            break;

                        case 'mobile-number':
                        case 'landline-number':
                        case 'proper-case-text':
                        case 'short-name':
                        case 'company-email':
                        case 'company-phone':
                        case 'company-name':
                            const value = $(fieldConfig.selector).val();
                            formData[fieldId] = value ? value.trim() : '';
                            console.log(`    ✓ Extracted value: '${formData[fieldId]}'`);
                            break;

                        case 'entity-type':
                            formData[fieldId] = $(fieldConfig.selector).val() || '';
                            console.log(`    ✓ Extracted entity-type: '${formData[fieldId]}'`);
                            break;

                        case 'melbourne-address':
                            formData[fieldId] = {
                                street: $(fieldConfig.selectors.street).val() || '',
                                street2: $(fieldConfig.selectors.street2).val() || '',
                                city: $(fieldConfig.selectors.city).val() || '',
                                state: $(fieldConfig.selectors.state).val() || '',
                                zip: $(fieldConfig.selectors.zip).val() || ''
                            };
                            console.log(`    ✓ Extracted address:`, formData[fieldId]);
                            break;

                        case 'contact-group':
                            formData.contact_info = {
                                email: $(fieldConfig.selectors.email).val().trim(),
                                mobile: $(fieldConfig.selectors.mobile).val().trim(),
                                phone: $(fieldConfig.selectors.phone).val().trim()
                            };
                            console.log(`    ✓ Extracted contact_info:`, formData.contact_info);
                            break;

                        default:
                            // Safe default handling
                            const defaultValue = $(fieldConfig.selector).val();
                            formData[fieldId] = defaultValue ? defaultValue.trim() : '';
                            console.log(`    ✓ Extracted (default): '${formData[fieldId]}'`);
                    }
                }

                console.log(`📦 Extracted complete form data:`, formData);
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
                eventListeners.setupAddressAutocompleteListeners();

                // Change submit button text to "Validate" for company forms
                $(document).on('knack-view-render.view_4059', function (event, view, data) {
                    setTimeout(function () {
                        const $submitBtn = $('#view_4059 button[type="submit"], #view_4059 input[type="submit"]');
                        if ($submitBtn.length) {
                            $submitBtn.text('Validate');
                            console.log('✏️ Changed submit button text to "Validate" for view_4059');
                        }

                        // Focus on Company short name field
                        const $shortNameField = $('#field_3783');
                        if ($shortNameField.length) {
                            $shortNameField.focus();
                            console.log('⌨️ Focused Company short name field (field_3783)');
                        }

                        // Trim email field on blur
                        $('#field_4164').off('blur.trim').on('blur.trim', function () {
                            const trimmed = $(this).val().trim();
                            if (trimmed !== $(this).val()) {
                                $(this).val(trimmed);
                            }
                        });
                    }, 100);
                });

                // Company Update Form (view_5605)
                $(document).on('knack-view-render.view_5605', function (event, view, data) {
                    setTimeout(function () {
                        const viewId = 'view_5605';
                        const $submitBtn = $(`#${viewId} button[type="submit"], #${viewId} input[type="submit"]`);

                        if ($submitBtn.length) {
                            // Set initial button text to "Save" (update forms don't need validation unless fields change)
                            $submitBtn.text('Save');
                            console.log('✏️ Set submit button text to "Save" for view_5605 (Update Company)');

                            // Initialize Processing Status to "Ready" on form render
                            const $processingStatusInit = $('#view_5605-field_4023');
                            if ($processingStatusInit.length && $processingStatusInit.val() !== 'Ready') {
                                $processingStatusInit.val('Ready').trigger('change');
                                console.log('🔄 Reset Processing Status to "Ready" on form render');
                            }
                        }

                        // Capture original values from hidden views for change detection
                        const originalValues = companyFormHandler.getOriginalValues(viewId);
                        const recordIds = companyFormHandler.getExistingRecordIds(viewId);

                        // Store as baseline for change detection
                        changeTracker.validatedValues[viewId] = {
                            field_992: originalValues.company_name || '',
                            field_3783: originalValues.company_short_name || '',
                            field_4164: originalValues.email || '',
                            field_4056: originalValues.phone || '',
                            street_address: originalValues.street_address || ''
                        };

                        // Store record IDs globally for webhook payloads
                        window._existingRecordIds = recordIds;

                        // Store original values globally for post-submission webhook
                        // (needed when direct submission happens without pre-submission webhook)
                        window._originalFormValues = originalValues;

                        console.log('📋 Captured original values for view_5605:', changeTracker.validatedValues[viewId]);
                        console.log('📋 Captured record IDs for view_5605:', recordIds);

                        // Set up field error listeners
                        duplicateHandler.setupFieldErrorListeners(viewId);

                        // Trim email field on blur
                        $('#field_4164').off('blur.trim').on('blur.trim', function () {
                            const trimmed = $(this).val().trim();
                            if (trimmed !== $(this).val()) {
                                $(this).val(trimmed);
                            }
                        });
                    }, 100);
                });

                // Set up post-submission webhook listeners for company forms
                $(document).on('knack-form-submit.view_4059', function (event, view, response) {
                    console.log(`📝 Form submission completed for view_4059 (company-creation)`);
                    console.log(`📦 Submission response:`, response);

                    // Capture company record ID for quick-create contact flow
                    if (response && response.record && response.record.id) {
                        window._newCompanyRecordId = response.record.id;
                        console.log(`🏢 Captured company record ID: ${window._newCompanyRecordId}`);
                    }

                    // Fire post-submission webhook immediately
                    // The webhook will create the ECN and redirect to Quick Create Contact form
                    console.log(`🚀 Firing post-submission webhook (will redirect to Quick Create Contact after response)`);
                    companyFormHandler.firePostSubmissionWebhook('view_4059', response);
                });

                $(document).on('knack-form-submit.view_5605', function (event, view, response) {
                    console.log(`📝 Form submission completed for view_5605 (company-update)`);
                    console.log(`📦 Submission response:`, response);

                    // Extract ECN ID from Knack's response
                    let ecnId = null;
                    try {
                        if (response && response.record && response.record.id) {
                            ecnId = response.record.id;
                            console.log(`✅ Extracted ECN ID from Knack response: ${ecnId}`);
                        }
                    } catch (error) {
                        console.error(`❌ Could not extract ECN ID from response:`, error);
                    }

                    // Store ECN ID for post-submission webhook
                    if (ecnId) {
                        window._ecnRecordId = ecnId;
                    }

                    // Store change tracking for polling on contact view
                    // This is used to determine if address view fields should be hidden until Ready
                    const changeDetection = window._preSubmissionChangeDetection;
                    if (changeDetection) {
                        window._updateCompanyChanges = {
                            emailChanged: changeDetection.email_has_changed || false,
                            phoneChanged: changeDetection.phone_has_changed || false,
                            addressChanged: changeDetection.street_address_has_changed || false
                        };
                        console.log('📋 Stored change tracking for polling:', window._updateCompanyChanges);
                    }

                    // Fire post-submission webhook (update forms may not need redirect)
                    setTimeout(() => {
                        console.log(`⏱️ Firing post-submission webhook for update form`);
                        companyFormHandler.firePostSubmissionWebhook('view_5605', response);
                    }, 1000);
                });

                // ===== CONTACT CREATION FORM (view_5612) =====
                $(document).on('knack-view-render.view_5612', function (event, view, data) {
                    setTimeout(function () {
                        const viewId = 'view_5612';
                        // Try multiple selectors - form may be in modal or inline
                        let $submitBtn = $(`#${viewId} button[type="submit"], #${viewId} input[type="submit"]`);
                        if (!$submitBtn.length) {
                            // Try within modal context
                            $submitBtn = $('.kn-modal button[type="submit"], .kn-modal input[type="submit"]');
                        }
                        if (!$submitBtn.length) {
                            // Try generic form submit button
                            $submitBtn = $(`#${viewId}`).find('.kn-button.is-primary, button.is-primary');
                        }

                        if ($submitBtn.length) {
                            // Set submit button text to "Validate" for duplicate checking
                            $submitBtn.text('Validate');
                            console.log('✏️ Changed submit button text to "Validate" for view_5612 (Create Contact)');
                        } else {
                            console.warn('⚠️ Could not find submit button for view_5612');
                        }

                        // Focus on first name field
                        const $firstNameField = $('input[name="first"]');
                        if ($firstNameField.length) {
                            $firstNameField.focus();
                            console.log('⌨️ Focused first name field');
                        }

                        // Trim email field on blur
                        $('#field_4164').off('blur.trim').on('blur.trim', function () {
                            const trimmed = $(this).val().trim();
                            if (trimmed !== $(this).val()) {
                                $(this).val(trimmed);
                            }
                        });

                        // Set up field error listeners for conflict handling
                        duplicateHandler.setupFieldErrorListeners(viewId);

                        console.log('✅ Contact creation form (view_5612) initialized');
                    }, 100);
                });

                // Contact Creation Form submit handler (view_5612)
                $(document).on('knack-form-submit.view_5612', function (event, view, response) {
                    console.log(`📝 Form submission completed for view_5612 (contact-creation)`);
                    console.log(`📦 Submission response:`, response);

                    // Fire post-submission webhook if enabled
                    contactFormHandler.firePostSubmissionWebhook('view_5612', response);
                });

                // ===== CREATE CONTACT WITH COMPANY FORM (view_5631) =====
                $(document).on('knack-view-render.view_5631', function (event, view, data) {
                    setTimeout(function () {
                        const viewId = 'view_5631';
                        // Try multiple selectors - form may be in modal or inline
                        let $submitBtn = $(`#${viewId} button[type="submit"], #${viewId} input[type="submit"]`);
                        if (!$submitBtn.length) {
                            // Try within modal context
                            $submitBtn = $('.kn-modal button[type="submit"], .kn-modal input[type="submit"]');
                        }
                        if (!$submitBtn.length) {
                            // Try generic form submit button
                            $submitBtn = $(`#${viewId}`).find('.kn-button.is-primary, button.is-primary');
                        }

                        if ($submitBtn.length) {
                            // Set submit button text to "Validate" for duplicate checking
                            $submitBtn.text('Validate');
                            console.log('✏️ Changed submit button text to "Validate" for view_5631 (Create Contact with Company)');
                        } else {
                            console.warn('⚠️ Could not find submit button for view_5631');
                        }

                        // Focus on first name field
                        const $firstNameField = $(`#${viewId} input[name="first"]`);
                        if ($firstNameField.length) {
                            $firstNameField.focus();
                            console.log('⌨️ Focused first name field');
                        }

                        // Trim email field on blur
                        $(`#${viewId} #field_4164`).off('blur.trim').on('blur.trim', function () {
                            const trimmed = $(this).val().trim();
                            if (trimmed !== $(this).val()) {
                                $(this).val(trimmed);
                            }
                        });

                        // Capture parent record ID (company_id) from hidden view
                        const config = viewConfigs[viewId];
                        if (config && config.hiddenView && config.hiddenView.recordIds) {
                            const parentIdSelector = config.hiddenView.recordIds.parent_record_id;
                            const $parentIdField = $(parentIdSelector);
                            if ($parentIdField.length) {
                                const parentId = $parentIdField.text().trim();
                                window._parentRecordId = parentId;
                                console.log(`📋 Captured parent_record_id (company_id) for view_5631: ${parentId}`);
                            } else {
                                console.warn('⚠️ Could not find parent_record_id field in hidden view');
                            }
                        }

                        // Set up field error listeners for conflict handling
                        duplicateHandler.setupFieldErrorListeners(viewId);

                        console.log('✅ Create Contact with Company form (view_5631) initialized');
                    }, 100);
                });

                // Create Contact with Company Form submit handler (view_5631)
                $(document).on('knack-form-submit.view_5631', function (event, view, response) {
                    console.log(`📝 Form submission completed for view_5631 (contact-creation with company)`);
                    console.log(`📦 Submission response:`, response);

                    // Set flag to show pending message when view_5634 renders
                    window._newContactPending = true;
                    console.log('🚩 Set _newContactPending flag for view_5634');

                    // Fire post-submission webhook with callbacks
                    contactFormHandler.firePostSubmissionWebhook('view_5631', response, {
                        onSuccess: function (result) {
                            console.log('✅ COMs created successfully, refreshing staff list');

                            // Clear the pending flag
                            window._newContactPending = false;

                            // Remove the pending message
                            $('#new-contact-pending').fadeOut(300, function () {
                                $(this).remove();
                            });

                            // Refresh view_5634 (Staff Details) using KTL
                            setTimeout(function () {
                                if (window.ktl && window.ktl.views && typeof window.ktl.views.refreshView === 'function') {
                                    window.ktl.views.refreshView('view_5634');
                                    console.log('🔄 Refreshed view_5634 (Staff Details) using KTL');
                                } else if (typeof Knack !== 'undefined' && Knack.views && Knack.views.view_5634) {
                                    Knack.views.view_5634.model.fetch();
                                    console.log('🔄 Refreshed view_5634 using Knack native');
                                }
                            }, 300);
                        },
                        onError: function (error) {
                            console.error('❌ Error creating COMs:', error);

                            // Clear the pending flag
                            window._newContactPending = false;

                            // Update the pending message to show error
                            const $pendingMessage = $('#new-contact-pending');
                            if ($pendingMessage.length) {
                                $pendingMessage.css({
                                    'background': '#f8d7da',
                                    'border-color': '#f5c6cb'
                                }).html(`
                                    <i class="fa fa-exclamation-circle" style="color: #721c24;"></i>
                                    <span style="color: #721c24; font-weight: 500;">Error setting up contact details. Please check the contact manually.</span>
                                `);

                                // Auto-hide after 10 seconds
                                setTimeout(function () {
                                    $pendingMessage.fadeOut(300, function () {
                                        $(this).remove();
                                    });
                                }, 10000);
                            }
                        }
                    });
                });

                // ===== QUICK CREATE CONTACT FORM (view_5685) =====
                // This form is shown after company creation for streamlined workflow
                $(document).on('knack-view-render.view_5685', function (event, view, data) {
                    setTimeout(function () {
                        const viewId = 'view_5685';
                        console.log('👀 Quick Create Contact form (view_5685) rendered');

                        // Prefill parent_record_id from stored company record ID
                        if (window._newCompanyRecordId) {
                            const $parentField = $('#field_4358');
                            if ($parentField.length) {
                                $parentField.val(window._newCompanyRecordId);
                                console.log(`🏢 Prefilled field_4358 with company record ID: ${window._newCompanyRecordId}`);
                            } else {
                                console.warn('⚠️ Could not find field_4358 to prefill parent_record_id');
                            }
                            // Store for webhook payload
                            window._parentRecordId = window._newCompanyRecordId;
                        } else {
                            console.warn('⚠️ No company record ID found in window._newCompanyRecordId');
                        }

                        // Find and hide the default submit button
                        let $defaultSubmitBtn = $(`#${viewId} button[type="submit"], #${viewId} input[type="submit"]`);
                        if ($defaultSubmitBtn.length) {
                            $defaultSubmitBtn.hide();
                            console.log('🔒 Hidden default submit button');
                        }

                        // Create custom dual submit buttons
                        const $buttonContainer = $(`
                            <div id="quick-create-buttons" style="display: flex; gap: 10px; margin-top: 20px; justify-content: flex-end;">
                                <button type="button" id="btn-create-proposal" class="kn-button" style="
                                    background: #6c757d;
                                    color: white;
                                    border: none;
                                    padding: 10px 20px;
                                    border-radius: 4px;
                                    cursor: pointer;
                                    font-weight: 500;
                                ">
                                    <i class="fa fa-file-text-o" style="margin-right: 8px;"></i>Create Proposal
                                </button>
                                <button type="button" id="btn-create-project" class="kn-button" style="
                                    background: #39b54a;
                                    color: white;
                                    border: none;
                                    padding: 10px 20px;
                                    border-radius: 4px;
                                    cursor: pointer;
                                    font-weight: 500;
                                ">
                                    <i class="fa fa-folder-open" style="margin-right: 8px;"></i>Create Project
                                </button>
                            </div>
                        `);

                        // Insert buttons after the form
                        const $form = $(`#${viewId} form, #${viewId}.kn-form`);
                        if ($form.length) {
                            $form.append($buttonContainer);
                            console.log('✅ Added dual submit buttons (Create Project / Create Proposal)');
                        }

                        // Handle Create Project button click
                        $('#btn-create-project').off('click.quickCreate').on('click.quickCreate', function () {
                            console.log('🚀 Create Project button clicked');
                            window._quickCreateNextAction = 'project';
                            // Trigger form validation and submission
                            if ($defaultSubmitBtn.length) {
                                $defaultSubmitBtn.trigger('click');
                            }
                        });

                        // Handle Create Proposal button click
                        $('#btn-create-proposal').off('click.quickCreate').on('click.quickCreate', function () {
                            console.log('🚀 Create Proposal button clicked');
                            window._quickCreateNextAction = 'proposal';
                            // Trigger form validation and submission
                            if ($defaultSubmitBtn.length) {
                                $defaultSubmitBtn.trigger('click');
                            }
                        });

                        // Focus on first name field
                        const $firstNameField = $(`#${viewId} input[name="first"]`);
                        if ($firstNameField.length) {
                            $firstNameField.focus();
                            console.log('⌨️ Focused first name field');
                        }

                        // Trim email field on blur
                        $(`#${viewId} #field_4164`).off('blur.trim').on('blur.trim', function () {
                            const trimmed = $(this).val().trim();
                            if (trimmed !== $(this).val()) {
                                $(this).val(trimmed);
                            }
                        });

                        // Set up field error listeners for conflict handling
                        duplicateHandler.setupFieldErrorListeners(viewId);

                        console.log('✅ Quick Create Contact form (view_5685) initialized');
                    }, 100);
                });

                // Quick Create Contact Form submit handler (view_5685)
                $(document).on('knack-form-submit.view_5685', function (event, view, response) {
                    console.log(`📝 Form submission completed for view_5685 (quick-create contact)`);
                    console.log(`📦 Submission response:`, response);

                    const nextAction = window._quickCreateNextAction || 'view';
                    console.log(`📋 Next action after contact creation: ${nextAction}`);

                    // Fire post-submission webhook with callbacks
                    contactFormHandler.firePostSubmissionWebhook('view_5685', response, {
                        onSuccess: function (result) {
                            console.log('✅ COMs created successfully');

                            // Get ECN ID for redirect
                            let ecnId = null;
                            if (result && result.ecn_id) {
                                ecnId = result.ecn_id;
                            } else if (result && result.ecn_record_id) {
                                ecnId = result.ecn_record_id;
                            } else if (window._newCompanyEcnId) {
                                ecnId = window._newCompanyEcnId;
                            }

                            // Redirect based on next action
                            // For prototype, all options redirect to View Contact
                            if (ecnId) {
                                const redirectUrl = `#contacts6/view-contact3/${ecnId}`;
                                console.log(`🔀 Redirecting to contact view: ${redirectUrl}`);
                                console.log(`📋 (Prototype: Next action "${nextAction}" would go to different form)`);
                                window.location.hash = redirectUrl;
                            } else {
                                console.warn('⚠️ No ECN ID available for redirect');
                            }

                            // Cleanup
                            delete window._quickCreateNextAction;
                            delete window._newCompanyRecordId;
                            delete window._newCompanyEcnId;
                        },
                        onError: function (error) {
                            console.error('❌ Error creating COMs:', error);
                            // Cleanup
                            delete window._quickCreateNextAction;
                        }
                    });
                });

                // ===== CONTACT UPDATE FORM (view_5626) =====
                $(document).on('knack-view-render.view_5626', function (event, view, data) {
                    setTimeout(function () {
                        const viewId = 'view_5626';
                        const $submitBtn = $(`#${viewId} button[type="submit"], #${viewId} input[type="submit"]`);

                        if ($submitBtn.length) {
                            // Set initial button text to "Save" (update forms don't need validation unless fields change)
                            $submitBtn.text('Save');
                            console.log('✏️ Set submit button text to "Save" for view_5626 (Update Contact)');
                        }

                        // Capture original values from hidden view (view_5629) for change detection
                        const originalValues = contactFormHandler.getOriginalValues(viewId);
                        const recordIds = contactFormHandler.getExistingRecordIds(viewId);

                        // Store as baseline for change detection
                        changeTracker.validatedValues[viewId] = {
                            field_3860: {
                                first: originalValues.first_name || '',
                                last: originalValues.last_name || ''
                            },
                            field_3861: originalValues.preferred_name || '',
                            field_4164: originalValues.email || '',
                            field_4165: originalValues.mobile || '',
                            field_4056: originalValues.phone || ''
                        };

                        // Store record IDs globally for webhook payloads
                        window._existingRecordIds = recordIds;

                        // Store original values globally for post-submission webhook
                        window._originalFormValues = originalValues;

                        console.log('📋 Captured original values for view_5626:', changeTracker.validatedValues[viewId]);
                        console.log('📋 Captured record IDs for view_5626:', recordIds);

                        // Set up field error listeners for conflict handling
                        duplicateHandler.setupFieldErrorListeners(viewId);

                        // Trim email field on blur
                        $('#field_4164').off('blur.trim').on('blur.trim', function () {
                            const trimmed = $(this).val().trim();
                            if (trimmed !== $(this).val()) {
                                $(this).val(trimmed);
                            }
                        });

                        console.log('✅ Contact update form (view_5626) initialized');
                    }, 100);
                });

                // Contact Update Form submit handler (view_5626)
                $(document).on('knack-form-submit.view_5626', function (event, view, response) {
                    console.log(`📝 Form submission completed for view_5626 (contact-update)`);
                    console.log(`📦 Submission response:`, response);

                    // Calculate change detection based on FINAL submitted values (not pre-submission)
                    // This is important because user may have resolved conflicts by deleting values
                    const originalValues = window._originalFormValues || {};
                    const storedFormData = window._preSubmissionFormData || {};

                    // Get final submitted values
                    const finalFirstName = storedFormData.field_3860 ? (storedFormData.field_3860.first || '').trim() : '';
                    const finalLastName = storedFormData.field_3860 ? (storedFormData.field_3860.last || '').trim() : '';
                    const finalEmail = contactFormHandler.normalizeEmail(
                        storedFormData.contact_info ? storedFormData.contact_info.email : (storedFormData.field_4164 || '')
                    );
                    const finalMobile = contactFormHandler.normalizePhone(
                        storedFormData.contact_info ? storedFormData.contact_info.mobile : (storedFormData.field_4165 || '')
                    );
                    const finalPhone = contactFormHandler.normalizePhone(
                        storedFormData.contact_info ? storedFormData.contact_info.phone : (storedFormData.field_4056 || '')
                    );

                    // Get original values (normalized)
                    const origFirstName = (originalValues.first_name || '').trim();
                    const origLastName = (originalValues.last_name || '').trim();
                    const origEmail = contactFormHandler.normalizeEmail(originalValues.email || '');
                    const origMobile = contactFormHandler.normalizePhone(originalValues.mobile || '');
                    const origPhone = contactFormHandler.normalizePhone(originalValues.phone || '');

                    // Calculate non-superficial changes (name, email, mobile, phone - NOT preferred_name)
                    const nameChanged = (finalFirstName !== origFirstName) || (finalLastName !== origLastName);
                    const emailChanged = finalEmail !== origEmail;
                    const mobileChanged = finalMobile !== origMobile;
                    const phoneChanged = finalPhone !== origPhone;

                    const hasNonSuperficialChanges = nameChanged || emailChanged || mobileChanged || phoneChanged;

                    console.log(`📊 Final change detection (post-submission):`);
                    console.log(`   Name changed: ${nameChanged} ("${origFirstName} ${origLastName}" → "${finalFirstName} ${finalLastName}")`);
                    console.log(`   Email changed: ${emailChanged} ("${origEmail}" → "${finalEmail}")`);
                    console.log(`   Mobile changed: ${mobileChanged} ("${origMobile}" → "${finalMobile}")`);
                    console.log(`   Phone changed: ${phoneChanged} ("${origPhone}" → "${finalPhone}")`);
                    console.log(`   Has non-superficial changes: ${hasNonSuperficialChanges}`);

                    // Store change tracking for polling on contact view
                    window._updateContactChanges = {
                        nameChanged: nameChanged,
                        emailChanged: emailChanged,
                        mobileChanged: mobileChanged,
                        phoneChanged: phoneChanged
                    };
                    console.log('📋 Stored change tracking for polling:', window._updateContactChanges);

                    // Only fire post-submission webhook if there are non-superficial changes
                    if (hasNonSuperficialChanges) {
                        setTimeout(() => {
                            console.log(`⏱️ Firing post-submission webhook for contact update form (non-superficial changes detected)`);
                            contactFormHandler.firePostSubmissionWebhook('view_5626', response);
                        }, 1000);
                    } else {
                        console.log(`⏭️ Skipping post-submission webhook - only superficial changes (preferred name)`);
                        // Cleanup window variables since we're not firing webhook
                        delete window._preSubmissionFormData;
                        delete window._preSubmissionChangeDetection;
                        delete window._originalFormValues;
                    }
                });

                // Add test data prefill buttons to configured views
                $(document).on('knack-view-render.any', function (event, view, data) {
                    if (!view || !view.key) return; // Safety check
                    const viewId = view.key;
                    if (viewConfigs[viewId]) {
                        // Small delay to ensure form is fully rendered
                        setTimeout(() => {
                            testDataGenerator.addPrefillButton(viewId);
                        }, 100);

                        // Validate prefilled fields for company and contact forms
                        if (viewId === 'view_4059' || viewId === 'view_5605' || viewId === 'view_5612' || viewId === 'view_5626' || viewId === 'view_5631') {
                            console.log(`📋 Form (${viewId}) rendered - checking for prefilled fields`);
                            setTimeout(() => {
                                eventListeners.validatePrefilledFields(viewId);
                            }, 500);
                        }
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

                                // Show error below the email field instead (view_5518)
                                const fieldId = 'field_3959';
                                const viewId = 'view_5518';

                                if (typeof notificationSystem !== 'undefined') {
                                    // Use unified notification system
                                    notificationSystem.showFieldNotification(viewId, fieldId, errorText, 'error');
                                } else {
                                    // Fallback to old style if notification system not loaded
                                    const $emailField = $('#kn-input-' + fieldId);
                                    if ($emailField.length) {
                                        $emailField.addClass('kn-error');
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
    // XERO-STYLE SEARCH-TO-CREATE MODULE
    // ========================================================================

    /**
     * Universal Xero-style search module
     * Provides search-as-you-type with "+ New" link functionality
     * Includes smart duplicate detection for contacts vs companies
     */
    const XeroStyleSearch = {
        registrations: {},

        /**
         * Normalize spaces: preserve trailing space, collapse multiples, remove leading
         */
        normalizeSpaces: function (str) {
            if (!str) return '';

            // Check if original has trailing space
            const hasTrailingSpace = str !== str.trimEnd();

            // Remove leading spaces, collapse multiple spaces to one
            let normalized = str.trimStart().replace(/\s+/g, ' ');

            // Preserve single trailing space if original had one
            if (hasTrailingSpace && !normalized.endsWith(' ')) {
                normalized += ' ';
            }

            return normalized;
        },

        /**
         * Convert string to Proper Case
         */
        toProperCase: function (str) {
            if (!str) return '';
            return str
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        },

        /**
         * Register a new entity for search-to-create
         */
        register: function (config) {
            const {
                entityName,
                listViewId,
                addButtonViewId,
                nameFieldId,
                minChars = 2,
                checkForExactMatch = false,
                connectionTypeFieldId = null, // For duplicate detection
                showModal = false, // If true, show modal choice between company/contact
                modalButtons = null // {company: 'Add Company', contact: 'Add Contact'}
            } = config;

            this.registrations[listViewId] = {
                entityName,
                listViewId,
                addButtonViewId,
                nameFieldId,
                minChars,
                checkForExactMatch,
                connectionTypeFieldId,
                showModal,
                modalButtons
            };

            console.log(`✅ Registered XeroStyleSearch for "${entityName}" on ${listViewId}`);

            // Initialize if view is already on page
            this.init(this.registrations[listViewId]);
        },

        /**
         * Initialize search for a registered view
         */
        init: function (cfg) {
            console.log(`🔍 Initializing Xero-style search for ${cfg.entityName}...`);

            // Wait for view to be ready
            $(document).on(`knack-view-render.${cfg.listViewId}`, () => {
                console.log(`   ✓ View ${cfg.listViewId} rendered`);

                // Check if view exists
                const $view = $(`#${cfg.listViewId}`);
                if ($view.length) {
                    this.setupLiveSearch(cfg);
                }
            });

            // Try immediate setup in case view already rendered
            const $view = $(`#${cfg.listViewId}`);
            if ($view.length) {
                console.log(`   ✓ Found ${cfg.listViewId} already on page, setting up now...`);
                this.setupLiveSearch(cfg);
            }
        },

        /**
         * Set up live search functionality
         */
        setupLiveSearch: function (cfg) {
            const $searchInput = $(`#${cfg.listViewId} input[name="keyword"]`);
            const $searchForm = $(`#${cfg.listViewId} .table-keyword-search`);
            const $searchContainer = $searchForm.length ? $searchForm : $(`#${cfg.listViewId} .kn-records-nav`);

            if (!$searchInput.length || !$searchContainer.length) {
                console.log(`   ⚠ Search input or container not found for ${cfg.listViewId}`);
                return;
            }

            // Check if already initialized
            if ($searchInput.data('xero-initialized')) {
                console.log(`   ⚠ Already initialized, skipping...`);
                return;
            }

            $searchInput.data('xero-initialized', true);
            console.log(`   ✓ Found search input and container`);

            // Update placeholder text
            $searchInput.attr('placeholder', 'Search to Add Contacts');

            let debounceTimer = null;
            let lastSearchTerm = '';
            let lastSearchHadResults = true;
            let searchInProgress = false;

            // Prevent form submission on Enter key
            $searchInput.on('keydown', function (e) {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    e.preventDefault();
                    console.log(`   ⏎ Enter key pressed - preventing form submission`);

                    // Clear any pending debounce timer to prevent double search
                    if (debounceTimer) {
                        clearTimeout(debounceTimer);
                        debounceTimer = null;
                    }

                    // Trigger search immediately instead of waiting for debounce
                    const searchTerm = XeroStyleSearch.normalizeSpaces($(this).val());
                    if (searchTerm.length >= cfg.minChars) {
                        XeroStyleSearch.filterTableDirectly(cfg.listViewId, searchTerm);

                        // Check if search has results
                        setTimeout(() => {
                            const rowCount = $(`#${cfg.listViewId} tbody tr`).length;
                            lastSearchHadResults = rowCount > 0;
                            lastSearchTerm = searchTerm;
                        }, 300);

                        XeroStyleSearch.showAddNewLink(cfg, searchTerm, $searchContainer);
                    }

                    return false;
                }
            });

            // Input handler with debouncing
            $searchInput.on('input', function () {
                const rawValue = $(this).val();
                const searchTerm = XeroStyleSearch.normalizeSpaces(rawValue);

                console.log(`   🔍 Search term: "${searchTerm}"`);

                // Clear any existing timer
                if (debounceTimer) {
                    clearTimeout(debounceTimer);
                }

                // Optimization: Skip search if adding characters to a zero-result search
                if (!lastSearchHadResults &&
                    lastSearchTerm.length > 0 &&
                    searchTerm.startsWith(lastSearchTerm) &&
                    searchTerm.length > lastSearchTerm.length) {
                    console.log(`   ⚡ Skipping search - previous search had no results and term is longer`);

                    // Still show the "+ New" link
                    const trimmedTerm = searchTerm.trim();
                    if (trimmedTerm.length >= cfg.minChars) {
                        XeroStyleSearch.showAddNewLink(cfg, trimmedTerm, $searchContainer);
                    }
                    return;
                }

                // Debounce - wait 900ms after user stops typing (increased from 600ms)
                debounceTimer = setTimeout(() => {
                    // Prevent duplicate searches
                    if (searchInProgress) {
                        console.log(`   ⚠️ Search already in progress, skipping...`);
                        return;
                    }

                    searchInProgress = true;
                    console.log(`   ⏱️ Pause detected (900ms), filtering for: "${searchTerm}"`);

                    // Normalize the input value in place
                    if (rawValue !== searchTerm) {
                        $(this).val(searchTerm);
                    }

                    // Filter table using server-side search (button will be shown by MutationObserver)
                    XeroStyleSearch.filterTableDirectly(cfg.listViewId, searchTerm);

                    // After search completes, check if we got results and reset flag
                    setTimeout(() => {
                        const rowCount = $(`#${cfg.listViewId} tbody tr`).length;
                        lastSearchHadResults = rowCount > 0;
                        lastSearchTerm = searchTerm;
                        searchInProgress = false;
                        console.log(`   📊 Search results: ${rowCount} rows found`);
                    }, 1000);

                    // DON'T show button here - let MutationObserver handle it after re-render
                }, 900);
            });

            // Clear button handler
            $searchContainer.find('.search-clear').on('click', function () {
                XeroStyleSearch.hideAddNewLink($searchContainer);
            });

            console.log(`   ✅ Live search initialized for ${cfg.entityName}`);
        },

        /**
         * Filter table using server-side search with MutationObserver
         */
        filterTableDirectly: function (viewId, searchTerm) {
            const $searchInput = $(`#${viewId} input[name="keyword"]`);
            const $searchButton = $(`#${viewId} a.kn-button.search`);

            if (!$searchButton.length) {
                console.log(`   ⚠ Search button not found for ${viewId}`);
                return;
            }

            // Ensure search input has the value
            $searchInput.val(searchTerm);

            console.log(`   🔄 Triggering server-side search for: "${searchTerm}"`);

            // Set up a MutationObserver to watch for the new input element after re-render
            const observer = new MutationObserver((mutations) => {
                const $newInput = $(`#${viewId} input[name="keyword"]`);
                const $newSearchForm = $(`#${viewId} .table-keyword-search`);
                const $newContainer = $newSearchForm.length ? $newSearchForm : $(`#${viewId} .kn-records-nav`);

                if ($newInput.length && $newInput[0] !== $searchInput[0]) {
                    console.log(`   🔄 New input detected, restoring state...`);

                    // New input detected - restore value and focus
                    $newInput.val(searchTerm);
                    $newInput.focus();

                    // Set cursor to end
                    const len = searchTerm.length;
                    if ($newInput[0].setSelectionRange) {
                        $newInput[0].setSelectionRange(len, len);
                    }

                    console.log(`   ✅ Focus and value restored`);

                    observer.disconnect();

                    // Re-show the "+ New" link after re-render (use correct container)
                    const cfg = XeroStyleSearch.registrations[viewId];
                    if (cfg && searchTerm.trim().length >= cfg.minChars && $newContainer.length) {
                        setTimeout(() => {
                            XeroStyleSearch.showAddNewLink(cfg, searchTerm.trim(), $newContainer);
                        }, 100);
                    }
                }
            });

            // Start observing the view container for changes
            const viewContainer = document.getElementById(viewId);
            if (viewContainer) {
                observer.observe(viewContainer, {
                    childList: true,
                    subtree: true
                });
            }

            // Click the search button to trigger server-side search
            console.log(`   🔘 Clicking search button...`);
            $searchButton[0].click();

            // Disconnect observer after 2 seconds as a safety measure
            setTimeout(() => {
                observer.disconnect();
            }, 2000);
        },

        /**
         * Normalize company name by removing "Pty Ltd" and "Ltd" variations
         */
        normalizeCompanyName: function (name) {
            if (!name) return '';

            return name.toLowerCase().trim()
                .replace(/\s*pty\.?\s*ltd\.?\s*$/i, '')  // Remove "Pty Ltd" at end
                .replace(/\s*pty\.?\s*$/i, '')           // Remove "Pty" at end
                .replace(/\s*ltd\.?\s*$/i, '')           // Remove "Ltd" at end
                .trim();
        },

        /**
         * Check for exact match and determine if it's a contact or company
         */
        checkForDuplicate: function (cfg, searchTerm) {
            if (!cfg.checkForExactMatch || !cfg.connectionTypeFieldId) {
                return null;
            }

            const $tableRows = $(`#${cfg.listViewId} tbody tr`);
            let exactMatch = null;
            const searchTermLower = searchTerm.toLowerCase().trim();
            const searchTermNormalized = this.normalizeCompanyName(searchTerm);

            console.log(`   🔍 Checking for duplicates. Search term: "${searchTermLower}", Normalized: "${searchTermNormalized}", Rows found: ${$tableRows.length}`);

            $tableRows.each(function (index) {
                const $row = $(this);
                const $cells = $row.find('td');

                // Check ALL cells to find the name (first cell might be ID)
                let foundMatchInRow = false;
                let matchedCellIndex = -1;

                $cells.each(function (cellIndex) {
                    const cellText = $(this).text().trim();
                    const cellTextLower = cellText.toLowerCase();
                    const cellTextNormalized = XeroStyleSearch.normalizeCompanyName(cellText);

                    // Check for EXACT match (exact or normalized match for company names)
                    const exactTextMatch = cellTextLower === searchTermLower;
                    const normalizedMatch = (searchTermNormalized.length > 0) &&
                        (cellTextNormalized === searchTermNormalized);

                    if (exactTextMatch || normalizedMatch) {
                        foundMatchInRow = true;
                        matchedCellIndex = cellIndex;
                        const matchType = exactTextMatch ? 'exact' : 'normalized (Pty/Ltd)';
                        console.log(`   🎯 ${matchType} match found in Row ${index}, Cell ${cellIndex}: "${cellText}"`);
                        return false; // Break cell loop
                    }
                });

                // If we found a match in this row, check for Connection Type
                if (foundMatchInRow) {
                    console.log(`   📋 Checking cells in matched row ${index}:`);

                    $cells.each(function (cellIndex) {
                        const cellText = $(this).text().trim();
                        console.log(`      Cell ${cellIndex}: "${cellText}"`);

                        // Check if this is a "Self - Contact" (person) vs other types (company)
                        if (cellText.includes('Self - Contact')) {
                            exactMatch = {
                                type: 'contact',
                                allowDuplicate: true,
                                $row: $row
                            };
                            console.log(`   👤 Match is a Contact (Person) - allowing duplicate`);
                            return false; // Break
                        } else if (cellText.includes('Self - ')) {
                            exactMatch = {
                                type: 'company',
                                allowDuplicate: false,
                                $row: $row
                            };
                            console.log(`   🏢 Match is a Company - blocking duplicate`);
                            return false; // Break
                        }
                    });

                    if (exactMatch) {
                        return false; // Break outer loop
                    }
                }
            });

            if (!exactMatch) {
                console.log(`   ✅ No exact match found - showing create button`);
            }

            return exactMatch;
        },

        /**
         * Show the "+ New" link (or update existing)
         */
        showAddNewLink: function (cfg, searchTerm, $container) {
            // Clear any previous highlights first
            const $view = $container.closest(`[id^="view_"]`);
            $view.find('.xero-exact-match-highlight').removeClass('xero-exact-match-highlight');

            // Check for duplicates if enabled
            const duplicate = this.checkForDuplicate(cfg, searchTerm);

            // If duplicate is a company, hide button and highlight the row
            if (duplicate && !duplicate.allowDuplicate) {
                console.log(`   ⚠ Exact company match found, highlighting row and hiding button`);
                duplicate.$row.addClass('xero-exact-match-highlight');
                console.log(`   🎨 Added highlight class to row. Classes: ${duplicate.$row.attr('class')}`);
                this.hideAddNewLink($container);
                return;
            }

            // If duplicate is a contact (person), highlight the row but still show the button
            if (duplicate && duplicate.allowDuplicate) {
                console.log(`   ℹ️ Exact contact match found, highlighting row but allowing duplicate`);
                duplicate.$row.addClass('xero-exact-match-highlight');
                console.log(`   🎨 Added highlight class to row. Classes: ${duplicate.$row.attr('class')}`);
                // Continue to show the button below
            }

            // Determine if this looks like a phone/email (searching, not creating)
            const isPhone = /^[\d\s\+\(\)\-]+$/.test(searchTerm);
            const isEmail = /@/.test(searchTerm);

            if (isPhone || isEmail) {
                console.log(`   ⚠ Search term looks like ${isPhone ? 'phone' : 'email'}, not showing create button`);
                this.hideAddNewLink($container);
                return;
            }

            // Find existing link or create new one
            let $link = $container.find('.xero-add-new-link');

            if ($link.length === 0) {
                // Create the link once
                $link = $(`
                    <a href="#" class="xero-add-new-link xero-hidden" data-term="">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span class="xero-link-text"></span>
                    </a>
                `);

                // Click handler (set once)
                $link.on('click', (e) => {
                    e.preventDefault();
                    const term = $link.attr('data-term');

                    if (cfg.showModal && cfg.modalButtons) {
                        XeroStyleSearch.showEntityTypeModal(cfg, term);
                    } else {
                        XeroStyleSearch.openFormWithPrefill(cfg, term);
                    }
                });

                // Add focus/blur handlers for keyboard navigation styling
                $link.on('focus', function () {
                    $(this).addClass('keyboard-focused');
                    // Force apply hover styles using attr() to set style with !important
                    const focusStyles = 'background: #39b54a !important; color: white !important; transform: translateY(-2px) !important; box-shadow: 0 4px 8px rgba(57, 181, 74, 0.25) !important;';
                    $(this).attr('style', focusStyles);
                    console.log('⌨️ Add-new-link focused, applied !important styles via attr');
                }).on('blur', function () {
                    $(this).removeClass('keyboard-focused');
                    // Remove inline styles to return to default
                    $(this).attr('style', '');
                    console.log('⌨️ Add-new-link blurred, removed inline styles');
                });

                // Add keyboard handler for Tab key to cycle back to search field
                $link.on('keydown', function (e) {
                    if (e.key === 'Tab' && !e.shiftKey) {
                        // Tab pressed (not Shift+Tab) - cycle back to search field
                        e.preventDefault();
                        const $searchInput = $container.closest('form').find('input[name="keyword"]');
                        if ($searchInput.length) {
                            $searchInput.focus();
                            // Select all text in the search field
                            $searchInput[0].select();
                            console.log('⌨️ Cycled back to search field with text selected');
                        } else {
                            console.log('⚠️ Could not find search input field');
                        }
                    }
                });

                $container.append($link);
                console.log(`   ✓ Created "+ New ${cfg.entityName}" button`);
            }

            // Update the text and data attribute (fast, no re-render)
            // Convert to proper case for display
            const properCaseTerm = this.toProperCase(searchTerm);
            $link.attr('data-term', properCaseTerm);  // Store proper case version
            $link.find('.xero-link-text').text(`Add '${properCaseTerm}' as new ${cfg.entityName}`);
            $link.removeClass('xero-hidden');

            console.log(`   ✓ Updated button text: "${properCaseTerm}"`);
        },

        /**
         * Convert text to Proper Case (Title Case)
         */
        toProperCase: function (text) {
            if (!text) return '';
            return text
                .toLowerCase()
                .split(' ')
                .map(word => {
                    if (word.length === 0) return word;
                    // Handle hyphenated words
                    if (word.includes('-')) {
                        return word.split('-').map(part =>
                            part.charAt(0).toUpperCase() + part.slice(1)
                        ).join('-');
                    }
                    return word.charAt(0).toUpperCase() + word.slice(1);
                })
                .join(' ');
        },

        /**
         * Show modal to choose between Company and Contact
         */
        showEntityTypeModal: function (cfg, searchTerm) {
            const properCaseTerm = this.toProperCase(searchTerm);
            console.log(`   📋 Showing entity type modal for: "${properCaseTerm}"`);

            // Create modal HTML
            const modalHtml = `
                <div class="xero-entity-modal-overlay">
                    <div class="xero-entity-modal keyboard-mode">
                        <h3>What would you like to add?</h3>
                        <p class="xero-entity-modal-search-term">'${properCaseTerm}'</p>
                        <div class="xero-entity-modal-buttons">
                            <button class="xero-entity-modal-btn xero-entity-company">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <span>Add New Company</span>
                            </button>
                            <button class="xero-entity-modal-btn xero-entity-contact">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span>Add New Contact</span>
                            </button>
                        </div>
                        <button class="xero-entity-modal-cancel">Cancel</button>
                    </div>
                </div>
            `;

            const $modal = $(modalHtml);
            $('body').append($modal);

            const $modalInner = $modal.find('.xero-entity-modal');
            const $companyBtn = $modal.find('.xero-entity-company');
            const $contactBtn = $modal.find('.xero-entity-contact');
            const $cancelBtn = $modal.find('.xero-entity-modal-cancel');
            const $allButtons = $modal.find('.xero-entity-modal-btn, .xero-entity-modal-cancel');

            // Helper: Enter keyboard mode and set focus highlight
            function enterKeyboardMode($focusedBtn) {
                $modalInner.addClass('keyboard-mode');
                $allButtons.removeClass('keyboard-focused');
                if ($focusedBtn && $focusedBtn.length) {
                    $focusedBtn.addClass('keyboard-focused');
                }
                console.log('⌨️ Entered keyboard mode');
            }

            // Helper: Enter mouse mode (remove keyboard highlights)
            function enterMouseMode() {
                $modalInner.removeClass('keyboard-mode');
                $allButtons.removeClass('keyboard-focused');
                console.log('🖱️ Entered mouse mode');
            }

            // Mouse enters a button: switch to mouse mode
            $allButtons.on('mouseenter', function () {
                enterMouseMode();
            });

            // Tab key pressed: switch to keyboard mode
            $allButtons.on('keydown', function (e) {
                if (e.key === 'Tab') {
                    // Determine which button will receive focus
                    let $nextBtn;
                    if (e.shiftKey) {
                        // Shift+Tab: go backwards
                        if ($(this).is($companyBtn)) {
                            $nextBtn = $cancelBtn;
                        } else if ($(this).is($contactBtn)) {
                            $nextBtn = $companyBtn;
                        } else if ($(this).is($cancelBtn)) {
                            $nextBtn = $contactBtn;
                        }
                    } else {
                        // Tab: go forwards
                        if ($(this).is($companyBtn)) {
                            $nextBtn = $contactBtn;
                        } else if ($(this).is($contactBtn)) {
                            $nextBtn = $cancelBtn;
                        } else if ($(this).is($cancelBtn)) {
                            $nextBtn = $companyBtn;
                        }
                    }

                    e.preventDefault();
                    if ($nextBtn) {
                        $nextBtn.focus();
                        enterKeyboardMode($nextBtn);
                    }
                }

                // Enter key activates button
                if (e.key === 'Enter') {
                    $(this).click();
                    e.preventDefault();
                }
            });

            // Track focus for keyboard mode (in case focus changes another way)
            $allButtons.on('focus', function () {
                // Only apply keyboard-focused if we're in keyboard mode
                if ($modalInner.hasClass('keyboard-mode')) {
                    $allButtons.removeClass('keyboard-focused');
                    $(this).addClass('keyboard-focused');
                }
            });

            // Add Company button click
            $companyBtn.on('click', () => {
                console.log(`   ✅ User chose: Add Company`);
                this.clickHiddenButton(cfg.modalButtons.company, searchTerm);
                $modal.remove();
            });

            // Add Contact button click
            $contactBtn.on('click', () => {
                console.log(`   ✅ User chose: Add Contact`);
                this.clickHiddenButton(cfg.modalButtons.contact, searchTerm);
                $modal.remove();
            });

            // Cancel button click
            $cancelBtn.on('click', () => {
                console.log(`   ❌ User cancelled`);
                $modal.remove();
            });

            // Click outside to close
            $modal.on('click', function (e) {
                if ($(e.target).hasClass('xero-entity-modal-overlay')) {
                    $modal.remove();
                }
            });

            // Escape key to close
            $(document).on('keydown.entityModal', function (e) {
                if (e.key === 'Escape') {
                    $modal.remove();
                    $(document).off('keydown.entityModal');
                }
            });

            // Show modal with animation and focus first button in keyboard mode
            setTimeout(() => {
                $modal.addClass('xero-entity-modal-show');
                setTimeout(() => {
                    $companyBtn.focus();
                    enterKeyboardMode($companyBtn);
                    console.log('⌨️ Focused Company button for keyboard navigation');
                }, 100);
            }, 10);
        },

        /**
         * Click a hidden button on view_5576 by button text
         */
        clickHiddenButton: function (buttonText, searchTerm) {
            console.log(`   🔘 Clicking hidden button: "${buttonText}"`);

            // Reset form state for fresh session (clears console and all tracking variables)
            const isContact = buttonText.toLowerCase().includes('contact');
            const viewId = isContact ? 'view_5612' : 'view_4059';
            if (typeof duplicateHandler !== 'undefined' && duplicateHandler.resetFormState) {
                duplicateHandler.resetFormState(viewId);
            }

            const $button = $(`#view_5576 a:contains("${buttonText}")`);

            if ($button.length) {
                // Store search term and button type for prefill
                window.xeroSearchTerm = searchTerm;
                window.xeroButtonType = isContact ? 'contact' : 'company';
                $button[0].click();
                console.log(`   ✅ Button clicked: "${buttonText}" (type: ${window.xeroButtonType})`);

                // Set up prefill handler
                this.setupPrefillHandler();
            } else {
                console.error(`   ❌ Hidden button not found: "${buttonText}"`);
            }
        },

        /**
         * Hide the "+ New" link (don't remove, just hide)
         */
        hideAddNewLink: function ($container) {
            const $link = $container.find('.xero-add-new-link');
            if ($link.length) {
                $link.addClass('xero-hidden');
            }
            // Note: We don't remove highlights here anymore - they're managed in showAddNewLink
        },

        /**
         * Open form and prefill name field
         */
        openFormWithPrefill: function (cfg, searchTerm) {
            console.log(`   📝 Opening form for: "${searchTerm}"`);

            // Reset form state for fresh session (clears console and all tracking variables)
            // Determine view ID from config if available
            const viewId = cfg.formViewId || null;
            if (typeof duplicateHandler !== 'undefined' && duplicateHandler.resetFormState) {
                duplicateHandler.resetFormState(viewId);
            }

            // Find and click the hidden "Add" button
            const $addButton = $(`#${cfg.addButtonViewId} a`).first();

            if ($addButton.length) {
                // Store the search term for prefill
                window.xeroSearchTerm = searchTerm;

                // Click the button
                $addButton[0].click();

                console.log(`   ✅ Form opened, prefill pending...`);

                // Prefill will happen via form render handler
                this.setupPrefillHandler();
            } else {
                console.error(`   ❌ Add button not found on ${cfg.addButtonViewId}`);
            }
        },

        /**
         * Set up prefill handler for forms
         */
        setupPrefillHandler: function () {
            // Listen for any view render
            const prefillHandler = function () {
                // Check if the search term is still stored
                if (window.xeroSearchTerm && window.xeroButtonType) {
                    const term = window.xeroSearchTerm;
                    const buttonType = window.xeroButtonType;

                    console.log(`   📝 Prefilling ${buttonType} form with: "${term}"`);

                    // Clear immediately to prevent duplicate prefills
                    delete window.xeroSearchTerm;
                    delete window.xeroButtonType;

                    if (buttonType === 'company') {
                        // Company form (view_4059)
                        XeroStyleSearch.prefillCompanyForm(term);
                    } else if (buttonType === 'contact') {
                        // Contact form
                        XeroStyleSearch.prefillContactForm(term);
                    }

                    // Remove this handler
                    $(document).off('knack-view-render.any', prefillHandler);
                }
            };

            // Listen for any view render
            $(document).on('knack-view-render.any', prefillHandler);

            // Safety timeout to remove handler
            setTimeout(() => {
                $(document).off('knack-view-render.any', prefillHandler);
            }, 5000);
        },

        /**
         * Convert text to Proper Case (Title Case)
         */
        toProperCase: function (text) {
            if (!text) return text;

            // Words that should remain lowercase (unless first word)
            const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with'];

            return text.split(/\s+/).map((word, index) => {
                // Preserve all-caps words (like "AA" in "AA Group")
                if (word === word.toUpperCase() && word.length > 1) {
                    return word;
                }

                // Lowercase small words (unless first word)
                if (index > 0 && smallWords.includes(word.toLowerCase())) {
                    return word.toLowerCase();
                }

                // Proper case for other words
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }).join(' ');
        },

        // ========================================================================
        // NAME FORMATTING UTILITIES
        // Smart name formatting with support for prefixes, hyphens, Mc/Mac/O'/d'
        // ========================================================================

        /**
         * Surname prefixes that stay lowercase when followed by another word
         * Note: 'van' handled separately (Dutch - always capitalised)
         * Note: 'de' handled separately (preserve user input)
         */
        lowercasePrefixes: ['von', 'di', 'la', 'le', 'del', 'della', 'dos', 'das', 'du'],

        /**
         * Check if text has mixed case (not all lowercase or all uppercase)
         * Used to detect if user has intentionally cased their input
         */
        hasMixedCase: function (text) {
            if (!text) return false;
            const hasUpper = /[A-Z]/.test(text);
            const hasLower = /[a-z]/.test(text);
            return hasUpper && hasLower;
        },

        /**
         * Format a single name part handling special patterns
         * Handles: hyphens, Mc, Mac, O', d', Fitz
         * @param {string} name - Single name part (no spaces)
         * @returns {string} Formatted name
         */
        formatNamePart: function (name) {
            if (!name) return '';

            // Handle hyphenated names - format each part
            if (name.includes('-')) {
                return name.split('-').map(part => this.formatNamePart(part)).join('-');
            }

            const lowerName = name.toLowerCase();

            // Handle d' prefix (d'Arcy, d'Angelo)
            if (lowerName.startsWith("d'") && lowerName.length > 2) {
                return "d'" + lowerName.charAt(2).toUpperCase() + lowerName.slice(3);
            }

            // Handle O' prefix (O'Brien, O'Connor)
            if (lowerName.startsWith("o'") && lowerName.length > 2) {
                return "O'" + lowerName.charAt(2).toUpperCase() + lowerName.slice(3);
            }

            // Handle Mc prefix (McDonald, McGregor) - must have letter after Mc
            if (lowerName.startsWith('mc') && lowerName.length > 2 && /[a-z]/.test(lowerName.charAt(2))) {
                return 'Mc' + lowerName.charAt(2).toUpperCase() + lowerName.slice(3);
            }

            // Handle Mac prefix (MacDonald, MacGregor) - must be followed by consonant
            // Avoids incorrectly capitalizing words like "Mace", "Machine", "Mach", "Mack"
            if (lowerName.startsWith('mac') && lowerName.length > 3) {
                const charAfterMac = lowerName.charAt(3);
                if (/[bcdfgjlmnpqrstvwxyz]/.test(charAfterMac)) {
                    return 'Mac' + lowerName.charAt(3).toUpperCase() + lowerName.slice(4);
                }
            }

            // Handle Fitz prefix (FitzGerald, FitzPatrick)
            if (lowerName.startsWith('fitz') && lowerName.length > 4) {
                return 'Fitz' + lowerName.charAt(4).toUpperCase() + lowerName.slice(5);
            }

            // Default: simple proper case
            return lowerName.charAt(0).toUpperCase() + lowerName.slice(1);
        },

        /**
         * Format first name - always proper case with special pattern handling
         * Handles multi-word first names like "Mary Jane", "Jean Pierre"
         * @param {string} firstName - First name to format
         * @returns {string} Formatted first name
         */
        formatFirstName: function (firstName) {
            if (!firstName) return '';

            const trimmed = firstName.trim();

            // If user has provided mixed case, preserve it (they know what they want)
            if (this.hasMixedCase(trimmed)) {
                console.log(`   📝 First name has mixed case - preserving: "${trimmed}"`);
                return trimmed;
            }

            // Handle multi-word first names - proper case each word
            if (trimmed.includes(' ')) {
                return trimmed.split(/\s+/).map(part => this.formatNamePart(part)).join(' ');
            }

            // Format the name part (handles hyphens, etc.)
            return this.formatNamePart(trimmed);
        },

        /**
         * Format last name - handles prefixes, hyphens, and special patterns
         * Dutch 'van' always capitalised, 'de' defaults to lowercase
         * @param {string} lastName - Last name to format (may contain spaces for prefixes)
         * @returns {string} Formatted last name
         */
        formatLastName: function (lastName) {
            if (!lastName) return '';

            const trimmed = lastName.trim();

            // If user has provided mixed case, preserve it (they know what they want)
            if (this.hasMixedCase(trimmed)) {
                console.log(`   📝 Last name has mixed case - preserving: "${trimmed}"`);
                return trimmed;
            }

            // Single word surname
            if (!trimmed.includes(' ')) {
                return this.formatNamePart(trimmed);
            }

            // Multi-word surname - check for prefixes
            const words = trimmed.split(/\s+/).filter(w => w.length > 0);
            const result = [];

            for (let i = 0; i < words.length; i++) {
                const word = words[i].toLowerCase();
                const isLastWord = (i === words.length - 1);

                if (isLastWord) {
                    // Last word always gets proper case formatting
                    result.push(this.formatNamePart(words[i]));
                } else if (word === 'van') {
                    // Dutch 'van' - always capitalised
                    result.push('Van');
                } else if (word === 'de') {
                    // 'de' - default to lowercase (more common internationally)
                    // User can provide mixed case like 'De Jong' to preserve capitalisation
                    result.push('de');
                } else if (word === 'den' || word === 'der') {
                    // Part of Dutch 'van den'/'van der' - lowercase as secondary particle
                    result.push(word);
                } else if (this.lowercasePrefixes.includes(word)) {
                    // Other known lowercase prefixes
                    result.push(word);
                } else {
                    // Unknown word in middle - proper case it
                    result.push(this.formatNamePart(words[i]));
                }
            }

            return result.join(' ');
        },

        /**
         * Format a full name from search input for contact form prefilling
         * @param {string} searchTerm - The search term to parse and format
         * @returns {object} { firstName: string, lastName: string }
         */
        formatSearchTermAsName: function (searchTerm) {
            if (!searchTerm) return { firstName: '', lastName: '' };

            const trimmed = searchTerm.trim();
            const words = trimmed.split(/\s+/).filter(w => w.length > 0);

            if (words.length === 0) {
                return { firstName: '', lastName: '' };
            }

            if (words.length === 1) {
                // Single word - goes to first name only
                return {
                    firstName: this.formatFirstName(words[0]),
                    lastName: ''
                };
            }

            // Two or more words: first word = first name, rest = last name
            const firstName = this.formatFirstName(words[0]);
            const lastNameParts = words.slice(1).join(' ');
            const lastName = this.formatLastName(lastNameParts);

            return { firstName, lastName };
        },

        /**
         * Prefill company form (view_4059, scene_1653)
         */
        prefillCompanyForm: function (searchTerm) {
            // Convert to proper case for display and prefilling
            const properCaseTerm = this.toProperCase(searchTerm);
            console.log(`   📝 Prefilling company form with: "${properCaseTerm}" (from search: "${searchTerm}")`);
            console.log(`   🔍 Looking for company form fields in view_4059, scene_1653...`);

            // Retry mechanism to wait for modal/form to fully render
            const prefillCompanyName = (attempt = 1, maxAttempts = 10) => {
                console.log(`   🔍 Attempt ${attempt} to find Company Name field (field_992)...`);

                // Look specifically in view_4059 and scene_1653
                const viewSelector = '#view_4059';
                const sceneSelector = '.kn-scene-1653';

                // Use simple selector like test data does - just #field_992
                let $companyNameField = $('#field_992');

                if (!$companyNameField.length) {
                    $companyNameField = $('input[name="field_992"]');
                }

                console.log(`   🔍 Company Name field search (attempt ${attempt}): found ${$companyNameField.length} elements`);
                if (attempt === 1 || attempt === maxAttempts) {
                    console.log(`   🔍 Looking in: ${viewSelector}, ${sceneSelector}, .kn-modal`);
                }

                if ($companyNameField.length) {
                    $companyNameField.val(properCaseTerm);  // Use proper case version
                    $companyNameField.trigger('change');
                    $companyNameField.trigger('input');
                    console.log(`   ✅ Prefilled Company Name (field_992) with: "${properCaseTerm}" on attempt ${attempt}`);

                    // Now focus the Short Name field
                    setTimeout(() => focusShortName(), 200);

                } else if (attempt < maxAttempts) {
                    // Try again after a delay
                    console.log(`   ⏳ Field not found, retrying in ${150 * attempt}ms...`);
                    setTimeout(() => prefillCompanyName(attempt + 1, maxAttempts), 150 * attempt);
                } else {
                    console.warn(`   ⚠ Company Name field (field_992) not found after ${maxAttempts} attempts`);
                    console.log(`   🔍 Available visible inputs in modal:`);
                    $('.kn-modal input:visible, #view_4059 input:visible, .kn-scene-1653 input:visible').each(function (i) {
                        console.log(`      Input ${i}: id="${this.id}", name="${this.name}", type="${this.type}"`);
                    });
                    // Still try to focus the Short Name field
                    setTimeout(() => focusShortName(), 200);
                }
            };

            // Focus Short Name field function
            const focusShortName = (attempt = 1, maxAttempts = 5) => {
                console.log(`   🔍 Attempt ${attempt} to find Short Name field (field_3783)...`);

                // Use simple selector like test data does - just #field_3783
                let $shortNameField = $('#field_3783');

                if (!$shortNameField.length) {
                    $shortNameField = $('input[name="field_3783"]');
                }

                console.log(`   🔍 Short Name field search (attempt ${attempt}): found ${$shortNameField.length} elements`);

                if ($shortNameField.length) {
                    $shortNameField.focus();
                    console.log(`   ✅ Focus set to Short Name (field_3783) on attempt ${attempt}`);

                    // Verify focus actually worked
                    setTimeout(() => {
                        if (document.activeElement && document.activeElement.id === 'field_3783') {
                            console.log(`   ✅ Focus verified - field_3783 is now active`);
                        } else {
                            console.warn(`   ⚠ Focus may not have worked. Active element: ${document.activeElement ? document.activeElement.id : 'none'}`);
                        }
                    }, 50);

                } else if (attempt < maxAttempts) {
                    // Try again after a delay
                    console.log(`   ⏳ Field not found, retrying in ${100 * attempt}ms...`);
                    setTimeout(() => focusShortName(attempt + 1, maxAttempts), 100 * attempt);
                } else {
                    console.warn(`   ⚠ Short Name field (field_3783) not found after ${maxAttempts} attempts`);
                }
            };

            // Start the prefill attempts
            setTimeout(() => prefillCompanyName(), 300);
        },

        /**
         * Prefill contact form (view_5612) with name field from search term
         * Uses smart name formatting with support for:
         * - Prefixes (de, van, von, di, etc.)
         * - Hyphenated names (Anderson-Whitely)
         * - Special patterns (McDonald, O'Brien, d'Arcy, FitzGerald)
         * - 1 word: First name only, focus on Last name
         * - 2+ words: First word to First, rest to Last (with prefix handling), focus on Preferred
         */
        prefillContactForm: function (searchTerm) {
            console.log(`   🔍 Looking for contact form fields (view_5612)...`);
            console.log(`   📝 Search term to prefill: "${searchTerm}"`);

            // Retry mechanism to wait for modal/form to fully render
            const prefillNameFields = (attempt = 1, maxAttempts = 10) => {
                console.log(`   🔍 Attempt ${attempt} to find name fields (field_3860)...`);

                // Find the name field inputs for view_5612 (field_3860)
                // Try multiple selector patterns
                let $firstNameInput = $('input[name="first"]');
                let $lastNameInput = $('input[name="last"]');

                // Fallback to more specific selectors if needed
                if (!$firstNameInput.length) {
                    $firstNameInput = $('#kn-input-field_3860 input#first');
                }
                if (!$lastNameInput.length) {
                    $lastNameInput = $('#kn-input-field_3860 input#last');
                }
                if (!$firstNameInput.length) {
                    $firstNameInput = $('#view_5612 input[name="first"]');
                }
                if (!$lastNameInput.length) {
                    $lastNameInput = $('#view_5612 input[name="last"]');
                }

                console.log(`   🔍 Name field search (attempt ${attempt}): First=${$firstNameInput.length}, Last=${$lastNameInput.length}`);

                if ($firstNameInput.length && $lastNameInput.length) {
                    // Use the smart name formatter
                    const formattedName = this.formatSearchTermAsName(searchTerm);

                    console.log(`   📝 Formatted name: First="${formattedName.firstName}", Last="${formattedName.lastName}"`);

                    if (!formattedName.firstName && !formattedName.lastName) {
                        console.warn(`   ⚠ No words to prefill`);
                        return;
                    }

                    if (!formattedName.lastName) {
                        // Single word - goes to First name, focus on Last name
                        $firstNameInput.val(formattedName.firstName);
                        $firstNameInput.trigger('change').trigger('input');

                        console.log(`   ✅ Prefilled First Name: "${formattedName.firstName}" (single word)`);

                        // Focus on Last name field
                        setTimeout(() => {
                            $lastNameInput.focus();
                            console.log(`   ✅ Focus set to Last Name field`);
                        }, 100);

                    } else {
                        // Two or more words - first to First, rest to Last
                        $firstNameInput.val(formattedName.firstName);
                        $lastNameInput.val(formattedName.lastName);
                        $firstNameInput.trigger('change').trigger('input');
                        $lastNameInput.trigger('change').trigger('input');

                        console.log(`   ✅ Prefilled Name: First="${formattedName.firstName}", Last="${formattedName.lastName}"`);

                        // Focus on Preferred field (field_3861)
                        this.focusPreferredField();
                    }

                } else if (attempt < maxAttempts) {
                    // Try again after a delay
                    console.log(`   ⏳ Name fields not found, retrying in ${150 * attempt}ms...`);
                    setTimeout(() => prefillNameFields(attempt + 1, maxAttempts), 150 * attempt);
                } else {
                    console.warn(`   ⚠ Name field inputs not found (field_3860) after ${maxAttempts} attempts`);
                    console.log(`   🔍 Available visible inputs:`);
                    $('input[type="text"]:visible').each(function (i) {
                        console.log(`      Input ${i}: id="${this.id}", name="${this.name}", placeholder="${$(this).attr('placeholder')}"`);
                    });
                }
            };

            // Start the prefill attempts after a short delay for modal to render
            setTimeout(() => prefillNameFields(), 300);
        },

        /**
         * Focus on Preferred field (field_3861) with retry mechanism
         */
        focusPreferredField: function (attempt = 1, maxAttempts = 5) {
            console.log(`   🔍 Attempt ${attempt} to find Preferred field (field_3861)...`);

            // Try multiple selectors for the Preferred field
            let $preferredField = $('#field_3861');

            if (!$preferredField.length) {
                $preferredField = $('input[name="field_3861"]');
            }
            if (!$preferredField.length) {
                $preferredField = $('#kn-input-field_3861 input');
            }
            if (!$preferredField.length) {
                $preferredField = $('#view_5612 #field_3861');
            }

            console.log(`   🔍 Preferred field search (attempt ${attempt}): found ${$preferredField.length} elements`);

            if ($preferredField.length) {
                $preferredField.focus();
                console.log(`   ✅ Focus set to Preferred field (field_3861)`);

                // Verify focus worked
                setTimeout(() => {
                    if (document.activeElement && (document.activeElement.id === 'field_3861' || document.activeElement.name === 'field_3861')) {
                        console.log(`   ✅ Focus verified - Preferred field is now active`);
                    } else {
                        console.warn(`   ⚠ Focus may not have worked. Active element: id="${document.activeElement ? document.activeElement.id : 'none'}", name="${document.activeElement ? document.activeElement.name : 'none'}"`);
                    }
                }, 50);

            } else if (attempt < maxAttempts) {
                console.log(`   ⏳ Preferred field not found, retrying in ${100 * attempt}ms...`);
                setTimeout(() => this.focusPreferredField(attempt + 1, maxAttempts), 100 * attempt);
            } else {
                console.warn(`   ⚠ Preferred field (field_3861) not found after ${maxAttempts} attempts`);
            }
        }
    };

    // Register the entity search on view_5581
    XeroStyleSearch.register({
        entityName: 'Contact',
        listViewId: 'view_5581',
        addButtonViewId: 'view_5576',
        minChars: 2,
        checkForExactMatch: true,
        connectionTypeFieldId: 'field_3852', // Hidden column 'Connection Type'
        showModal: true,
        modalButtons: {
            company: 'Add Company',
            contact: 'Add Contact'
        }
    });

    // ========================================================================
    // END XERO-STYLE SEARCH-TO-CREATE MODULE
    // ========================================================================

    // ========================================================================
    // CUSTOM AUTO-REFRESH FOR VIEW_4829 (ENQUIRIES TABLE) - 10 SECOND INTERVAL
    // ========================================================================

    let view4829RefreshTimer = null;
    let view4829IsActive = false;

    let view3503RefreshTimer = null;
    let view3503IsActive = false;

    // Function to start the refresh timer
    function startView4829Refresh() {
        if (view4829RefreshTimer) {
            clearInterval(view4829RefreshTimer);
        }

        view4829RefreshTimer = setInterval(function () {
            // Only refresh if view is active and on correct scene
            if (view4829IsActive && Knack.router.current_scene_key === 'scene_1973') {
                console.log('⏰ 10 seconds elapsed - refreshing view_4829...');

                // Use Knack's native fetch - smoother than KTL's refreshView which triggers full render
                Knack.views['view_4829'].model.fetch();
                console.log('✅ Called Knack native model.fetch() for view_4829');
            }
        }, 10000); // 10 seconds

        console.log('✅ Started 10-second auto-refresh for view_4829');
    }

    // Function to pulse the timestamp for view_4829
    function pulseTimestamp() {
        const $timestamp = $('#view_4829-timestamp-id');
        if ($timestamp.length) {
            console.log('⏱️ Pulsing timestamp after refresh (view_4829)');

            // Add pulse animation
            $timestamp.css({
                'animation': 'ktl-timestamp-pulse 1s ease-out',
                'animation-fill-mode': 'forwards'
            });

            // Remove animation after it completes
            setTimeout(function () {
                $timestamp.css('animation', '');
            }, 1000);
        }
    }

    // Function to start the refresh timer for view_3503
    function startView3503Refresh() {
        if (view3503RefreshTimer) {
            clearInterval(view3503RefreshTimer);
        }

        view3503RefreshTimer = setInterval(function () {
            // Only refresh if view is active and on correct scene
            if (view3503IsActive && Knack.router.current_scene_key === 'scene_1415') {
                console.log('⏰ 10 seconds elapsed - refreshing view_3503...');

                // Use Knack's native fetch - smoother than KTL's refreshView which triggers full render
                Knack.views['view_3503'].model.fetch();
                console.log('✅ Called Knack native model.fetch() for view_3503');
            }
        }, 10000); // 10 seconds

        console.log('✅ Started 10-second auto-refresh for view_3503');
    }

    // Function to pulse the timestamp for view_3503
    function pulseTimestamp3503() {
        const $timestamp = $('#view_3503-timestamp-id');
        if ($timestamp.length) {
            console.log('⏱️ Pulsing timestamp after refresh (view_3503)');

            // Add pulse animation
            $timestamp.css({
                'animation': 'ktl-timestamp-pulse 1s ease-out',
                'animation-fill-mode': 'forwards'
            });

            // Remove animation after it completes
            setTimeout(function () {
                $timestamp.css('animation', '');
            }, 1000);
        }
    }

    // ========================================================================
    // STACKED ACTION BUTTONS - Consolidate multiple action link columns into one
    // ========================================================================
    /**
     * Stacks multiple action button columns into a single column
     * @param {string} viewId - The view ID (e.g., 'view_4829')
     * @param {Array} buttonClasses - Array of button classes in order, first becomes the container
     *                                e.g., ['tableGreenButton', 'tablePinkButton', 'tableBlueButton']
     */
    function stackTableActionButtons(viewId, buttonClasses) {
        const $view = $(`#${viewId}`);
        if (!$view.length || buttonClasses.length < 2) return;

        const $table = $view.find('table.kn-table');
        if (!$table.length) return;

        console.log(`📚 Stacking ${buttonClasses.length} action buttons in ${viewId}`);

        // Find column indices by button class in header row (th) or first data row
        const columnIndices = [];
        const $firstRow = $table.find('tbody tr').first();

        buttonClasses.forEach((btnClass, idx) => {
            const $cell = $firstRow.find(`td:has(.${btnClass})`);
            if ($cell.length) {
                columnIndices.push($cell.index());
            }
        });

        if (columnIndices.length !== buttonClasses.length) {
            console.warn('⚠️ Could not find all button columns');
            return;
        }

        const primaryColIndex = columnIndices[0];
        const colsToHide = columnIndices.slice(1);

        // Process each row
        $table.find('tbody tr').each(function () {
            const $row = $(this);
            const $cells = $row.find('td');
            const $primaryCell = $cells.eq(primaryColIndex);

            // Skip if already processed
            if ($primaryCell.find('.stacked-action-buttons').length) return;

            // Create container for stacked buttons
            const $container = $('<div>').addClass('stacked-action-buttons');

            // Move primary button's link into container (detach preserves event handlers)
            const $primaryLink = $primaryCell.find('a').first();
            if ($primaryLink.length) {
                $container.append($primaryLink.detach());
            }

            // Move secondary buttons into container
            colsToHide.forEach(colIndex => {
                const $secondaryCell = $cells.eq(colIndex);
                const $secondaryLink = $secondaryCell.find('a').first();
                if ($secondaryLink.length) {
                    $container.append($secondaryLink.detach());
                }
                // Mark cell for hiding
                $secondaryCell.addClass('action-column-hidden');
            });

            // Replace primary cell content with container
            $primaryCell.find('span').first().html($container);
        });

        // Hide the header cells for consolidated columns
        const $headerRow = $table.find('thead tr');
        colsToHide.forEach(colIndex => {
            $headerRow.find('th').eq(colIndex).addClass('action-column-hidden');
        });

        console.log(`✅ Stacked buttons in ${viewId}: kept column ${primaryColIndex}, hid columns ${colsToHide.join(', ')}`);
    }

    /**
     * Flexible version - stacks action buttons where some columns may not exist
     * @param {string} viewId - The view ID (e.g., 'view_5638')
     * @param {string} primaryButtonClass - The button class that's always present (becomes container)
     * @param {Array} optionalButtonClasses - Array of button classes that may or may not exist
     * @param {string} stackOrder - 'before' or 'after' - where to place optional buttons relative to primary
     */
    function stackTableActionButtonsFlexible(viewId, primaryButtonClass, optionalButtonClasses = [], stackOrder = 'before') {
        const $view = $(`#${viewId}`);
        if (!$view.length) return;

        const $table = $view.find('table.kn-table');
        if (!$table.length) return;

        const $allRows = $table.find('tbody tr');
        if (!$allRows.length) return;

        // Find primary column by scanning all rows (must exist in at least one row)
        let primaryColIndex = -1;
        $allRows.each(function() {
            const $cell = $(this).find(`td:has(.${primaryButtonClass})`);
            if ($cell.length) {
                primaryColIndex = $cell.index();
                return false; // break
            }
        });

        if (primaryColIndex === -1) {
            console.warn(`⚠️ Primary button column (.${primaryButtonClass}) not found in ${viewId}`);
            return;
        }

        // Find which optional columns exist by scanning all rows
        const optionalColumns = [];
        optionalButtonClasses.forEach(btnClass => {
            let colIndex = -1;
            $allRows.each(function() {
                const $cell = $(this).find(`td:has(.${btnClass})`);
                if ($cell.length) {
                    colIndex = $cell.index();
                    return false; // break
                }
            });
            if (colIndex !== -1) {
                optionalColumns.push({
                    btnClass: btnClass,
                    colIndex: colIndex
                });
            }
        });

        if (optionalColumns.length === 0) {
            console.log(`📚 No optional columns found to stack in ${viewId}, skipping`);
            return;
        }

        console.log(`📚 Stacking ${optionalColumns.length + 1} action buttons in ${viewId} (flexible mode)`);

        // Process each row
        $table.find('tbody tr').each(function () {
            const $row = $(this);
            const $cells = $row.find('td');
            const $primaryCellInRow = $cells.eq(primaryColIndex);

            // Skip if already processed
            if ($primaryCellInRow.find('.stacked-action-buttons').length) return;

            // Create container for stacked buttons
            const $container = $('<div>').addClass('stacked-action-buttons');

            // Collect buttons to stack before primary
            const buttonsBefore = [];
            const buttonsAfter = [];

            optionalColumns.forEach(col => {
                const $secondaryCell = $cells.eq(col.colIndex);
                const $secondaryLink = $secondaryCell.find('a').first();
                if ($secondaryLink.length) {
                    // Detach the link (preserves event handlers)
                    const $movedLink = $secondaryLink.detach();

                    // Determine order based on column position relative to primary
                    if (col.colIndex < primaryColIndex) {
                        buttonsBefore.push($movedLink);
                    } else {
                        buttonsAfter.push($movedLink);
                    }
                }
                // Mark cell for hiding
                $secondaryCell.addClass('action-column-hidden');
            });

            // Get primary button and detach it (preserves event handlers)
            const $primaryLink = $primaryCellInRow.find('a').first();
            const $movedPrimaryLink = $primaryLink.length ? $primaryLink.detach() : null;

            // Build stack: buttons before + primary + buttons after
            buttonsBefore.forEach($btn => $container.append($btn));
            if ($movedPrimaryLink) {
                $container.append($movedPrimaryLink);
            }
            buttonsAfter.forEach($btn => $container.append($btn));

            // Replace primary cell content with container
            const $targetSpan = $primaryCellInRow.find('span').first();
            if ($targetSpan.length) {
                $targetSpan.html($container);
            } else {
                $primaryCellInRow.html($container);
            }
        });

        // Hide the header cells for optional columns
        const $headerRow = $table.find('thead tr');
        optionalColumns.forEach(col => {
            $headerRow.find('th').eq(col.colIndex).addClass('action-column-hidden');
        });

        const hiddenCols = optionalColumns.map(c => c.colIndex).join(', ');
        console.log(`✅ Stacked buttons in ${viewId}: kept column ${primaryColIndex} (Actions), hid columns ${hiddenCols}`);
    }

    // Handler for view_5638 (Notes table) - stack Call Recording, Move, Delete buttons
    $(document).on('knack-view-render.view_5638', function (event, view, data) {
        // Primary: tableGreyButton (Move/Actions - always present)
        // Optional: tableGreenButton (Call Recording), tableRedButton (Delete - Dev only)
        stackTableActionButtonsFlexible('view_5638', 'tableGreyButton', ['tableGreenButton', 'tableRedButton']);

    });

    // Handler for view_5642 (Add Note button) - move it into view_5638 pagination row
    $(document).on('knack-view-render.view_5642', function (event, view, data) {
        const $addNoteButton = $('#view_5642 .kn-details-link a').first();
        const $paginationRow = $('#view_5638 .kn-records-nav .level .level-right');

        if ($addNoteButton.length && $paginationRow.length) {
            // Check if already moved
            if ($paginationRow.find('.add-note-button-moved').length) return;

            // Clone the button with event handlers and add to pagination row
            const $clonedButton = $addNoteButton.clone(true, true).addClass('add-note-button-moved');

            // Append button to the right side of pagination row
            $paginationRow.append($clonedButton);

            // Hide original view_5642 and its parent column
            $('#view_5642').closest('.view-column').hide();

            console.log('✅ Moved Add Note button to view_5638 pagination row');
        }
    });


    // Handlers for tables with Edit/Note/Notes button stacking
    // Primary: tableGreenButton (Edit), Secondary: tablePinkButton (Note), tableBlueButton (Notes)
    $(document).on('knack-view-render.view_5652', function (event, view, data) {
        stackTableActionButtons('view_5652', ['tableGreenButton', 'tablePinkButton', 'tableBlueButton']);
    });

    $(document).on('knack-view-render.view_5649', function (event, view, data) {
        stackTableActionButtons('view_5649', ['tableGreenButton', 'tablePinkButton', 'tableBlueButton']);
    });

    $(document).on('knack-view-render.view_5664', function (event, view, data) {
        stackTableActionButtons('view_5664', ['tableGreenButton', 'tablePinkButton', 'tableBlueButton']);
    });

    $(document).on('knack-view-render.view_5655', function (event, view, data) {
        stackTableActionButtons('view_5655', ['tableGreenButton', 'tablePinkButton', 'tableBlueButton']);
    });

    $(document).on('knack-view-render.view_4795', function (event, view, data) {
        stackTableActionButtons('view_4795', ['tableGreenButton', 'tablePinkButton', 'tableBlueButton']);
    });

    $(document).on('knack-view-render.view_4793', function (event, view, data) {
        stackTableActionButtons('view_4793', ['tableGreenButton', 'tablePinkButton', 'tableBlueButton']);
    });

    $(document).on('knack-view-render.view_4887', function (event, view, data) {
        stackTableActionButtons('view_4887', ['tableGreenButton', 'tablePinkButton', 'tableBlueButton']);
    });

    $(document).on('knack-view-render.view_5667', function (event, view, data) {
        stackTableActionButtons('view_5667', ['tableGreenButton', 'tablePinkButton', 'tableBlueButton']);
    });

    // Monitor when view_4829 is rendered - start custom refresh
    // Note: Pause button removed in v1.0.13 - auto-refresh now always runs
    $(document).on('knack-view-render.view_4829', function (event, view, data) {
        console.log('🔍 view_4829 (Enquiries Table) rendered');
        console.log('📍 Current scene:', Knack.router.current_scene_key);
        console.log('📊 Number of records:', data && data.length ? data.length : 'unknown');

        // Pulse the timestamp when view renders (indicates refresh)
        setTimeout(pulseTimestamp, 100);

        // Stack action buttons (Edit, Note, Notes) into single column
        // Notes button (blue) only shown if Notes Count (field_3544) > 0
        (function() {
            const $view = $('#view_4829');
            const $table = $view.find('table.kn-table');
            if (!$table.length) return;

            const $allRows = $table.find('tbody tr');
            if (!$allRows.length) return;

            // Find column indices by scanning all rows
            let greenColIndex = -1, pinkColIndex = -1, blueColIndex = -1, notesCountColIndex = -1;

            $allRows.each(function() {
                const $row = $(this);
                if (greenColIndex === -1) {
                    const $cell = $row.find('td:has(.tableGreenButton)');
                    if ($cell.length) greenColIndex = $cell.index();
                }
                if (pinkColIndex === -1) {
                    const $cell = $row.find('td:has(.tablePinkButton)');
                    if ($cell.length) pinkColIndex = $cell.index();
                }
                if (blueColIndex === -1) {
                    const $cell = $row.find('td:has(.tableBlueButton)');
                    if ($cell.length) blueColIndex = $cell.index();
                }
                if (notesCountColIndex === -1) {
                    const $cell = $row.find('td.field_3544');
                    if ($cell.length) notesCountColIndex = $cell.index();
                }
            });

            if (greenColIndex === -1) {
                console.warn('⚠️ Could not find Edit button column in view_4829');
                return;
            }

            console.log(`📚 Stacking action buttons in view_4829 (conditional Notes button)`);

            // Process each row
            $allRows.each(function() {
                const $row = $(this);
                const $cells = $row.find('td');
                const $primaryCell = $cells.eq(greenColIndex);

                // Skip if already processed
                if ($primaryCell.find('.stacked-action-buttons').length) return;

                // Check Notes Count value
                let notesCount = 0;
                if (notesCountColIndex !== -1) {
                    const notesCountText = $cells.eq(notesCountColIndex).text().trim();
                    notesCount = parseInt(notesCountText, 10) || 0;
                }

                // Create container for stacked buttons
                const $container = $('<div>').addClass('stacked-action-buttons');

                // Add Edit button (green) - always (detach preserves event handlers)
                const $greenLink = $primaryCell.find('a').first();
                if ($greenLink.length) {
                    $container.append($greenLink.detach());
                }

                // Add Note button (pink) - always (detach preserves event handlers)
                if (pinkColIndex !== -1) {
                    const $pinkCell = $cells.eq(pinkColIndex);
                    const $pinkLink = $pinkCell.find('a').first();
                    if ($pinkLink.length) {
                        $container.append($pinkLink.detach());
                    }
                    $pinkCell.addClass('action-column-hidden');
                }

                // Add Notes button (blue) - only if notesCount > 0 (detach preserves event handlers)
                if (blueColIndex !== -1 && notesCount > 0) {
                    const $blueCell = $cells.eq(blueColIndex);
                    const $blueLink = $blueCell.find('a').first();
                    if ($blueLink.length) {
                        $container.append($blueLink.detach());
                    }
                }

                // Always hide blue column cell (even if button not added)
                if (blueColIndex !== -1) {
                    $cells.eq(blueColIndex).addClass('action-column-hidden');
                }

                // Replace primary cell content with container
                $primaryCell.find('span').first().html($container);
            });

            // Hide the header cells for consolidated columns
            const $headerRow = $table.find('thead tr');
            if (pinkColIndex !== -1) $headerRow.find('th').eq(pinkColIndex).addClass('action-column-hidden');
            if (blueColIndex !== -1) $headerRow.find('th').eq(blueColIndex).addClass('action-column-hidden');

            console.log(`✅ Stacked buttons in view_4829 with conditional Notes button`);
        })();

        // Only start refresh if we're on the correct scene
        if (Knack.router.current_scene_key === 'scene_1973') {
            view4829IsActive = true;

            // Add pulse animation CSS if not already added
            if ($('#ktl-timestamp-pulse-style').length === 0) {
                $('<style>')
                    .attr('id', 'ktl-timestamp-pulse-style')
                    .html(`
                        @keyframes ktl-timestamp-pulse {
                            0% {
                                transform: scale(1);
                                color: inherit;
                                font-weight: normal;
                            }
                            50% {
                                transform: scale(1.15);
                                color: #4CAF50;
                                font-weight: bold;
                            }
                            100% {
                                transform: scale(1);
                                color: inherit;
                                font-weight: normal;
                            }
                        }
                    `)
                    .appendTo('head');
                console.log('✅ Added timestamp pulse animation CSS');
            }

            // Start the refresh timer
            startView4829Refresh();
        }
    });

    // Monitor when view_3503 is rendered - start custom refresh
    $(document).on('knack-view-render.view_3503', function (event, view, data) {
        console.log('🔍 view_3503 rendered');
        console.log('📍 Current scene:', Knack.router.current_scene_key);
        console.log('📊 Number of records:', data && data.length ? data.length : 'unknown');

        // Pulse the timestamp when view renders (indicates refresh)
        setTimeout(pulseTimestamp3503, 100);

        // Only start refresh if we're on the correct scene
        if (Knack.router.current_scene_key === 'scene_1415') {
            view3503IsActive = true;

            // Add pulse animation CSS if not already added
            if ($('#ktl-timestamp-pulse-style').length === 0) {
                $('<style>')
                    .attr('id', 'ktl-timestamp-pulse-style')
                    .html(`
                        @keyframes ktl-timestamp-pulse {
                            0% {
                                transform: scale(1);
                                color: inherit;
                                font-weight: normal;
                            }
                            50% {
                                transform: scale(1.15);
                                color: #4CAF50;
                                font-weight: bold;
                            }
                            100% {
                                transform: scale(1);
                                color: inherit;
                                font-weight: normal;
                            }
                        }
                    `)
                    .appendTo('head');
                console.log('✅ Added timestamp pulse animation CSS');
            }

            // Start the refresh timer
            startView3503Refresh();
        }
    });

    // Stop refresh timers when leaving their respective scenes
    $(document).on('knack-scene-render', function (event, scene) {
        const currentScene = Knack.router.current_scene_key;

        // If we're not on scene_1973, stop the view_4829 refresh timer
        if (currentScene !== 'scene_1973' && view4829RefreshTimer) {
            console.log('🛑 Left scene_1973, stopping view_4829 auto-refresh');
            clearInterval(view4829RefreshTimer);
            view4829RefreshTimer = null;
            view4829IsActive = false;
        }

        // If we're not on scene_1415, stop the view_3503 refresh timer
        if (currentScene !== 'scene_1415' && view3503RefreshTimer) {
            console.log('🛑 Left scene_1415, stopping view_3503 auto-refresh');
            clearInterval(view3503RefreshTimer);
            view3503RefreshTimer = null;
            view3503IsActive = false;
        }
    });

    // ========================================================================
    // END CUSTOM AUTO-REFRESH
    // ========================================================================

    // ========================================================================
    // CONTACT VIEW PROCESSING STATUS POLLING (scene_2397)
    // Polls view_5600 field_4028 for processing status
    // Hides aerial/street view fields until status is Ready
    // ========================================================================

    let processingPollTimer = null;
    let processingPollAttempts = 0;
    let lastProcessingStatus = null; // Track previous status to avoid unnecessary refreshes
    let processingPollStartTime = null; // Track when polling started for 5 second minimum
    const MAX_POLL_ATTEMPTS = 60; // 60 seconds (1 second interval)
    const MIN_POLL_DURATION_MS = 5000; // Minimum 5 seconds of polling before stopping

    /**
     * Hide aerial and street view fields in view_5602 until processing is complete
     * field_4138 = Aerial view, field_4139 = Street address view
     */
    function hideAddressViewFields() {
        const $aerialField = $('#view_5602 .field_4138');
        const $streetField = $('#view_5602 .field_4139');

        if ($aerialField.length > 0) {
            $aerialField.hide();
            console.log('🙈 Hiding aerial view field (field_4138)');
        }
        if ($streetField.length > 0) {
            $streetField.hide();
            console.log('🙈 Hiding street view field (field_4139)');
        }
    }

    /**
     * Show aerial and street view fields in view_5602 when processing is complete
     */
    function showAddressViewFields() {
        const $aerialField = $('#view_5602 .field_4138');
        const $streetField = $('#view_5602 .field_4139');

        if ($aerialField.length > 0) {
            $aerialField.show();
            console.log('👁️ Showing aerial view field (field_4138)');
        }
        if ($streetField.length > 0) {
            $streetField.show();
            console.log('👁️ Showing street view field (field_4139)');
        }
    }

    /**
     * Update visibility of address view fields based on processing status
     * Only shows aerial/street view when status is Ready
     */
    function updateFieldVisibilityForProcessingStatus(status) {
        if (status === 'Ready') {
            showAddressViewFields();
        } else {
            hideAddressViewFields();
        }
    }

    /**
     * Check current processing status and update field visibility accordingly
     * Called when views render to ensure correct visibility state
     * Note: Does NOT trigger refresh - that's handled by pollProcessingStatus when transitioning from Loading to Ready
     */
    function checkAndUpdateFieldVisibility() {
        const $statusField = $('#view_5600 .field_4028 .kn-detail-body span span');

        if ($statusField.length > 0) {
            const statusValue = $statusField.text().trim();
            console.log(`🔍 Checking processing status on render: "${statusValue}"`);
            updateFieldVisibilityForProcessingStatus(statusValue);
        } else {
            // If status field not found yet, hide fields by default (safer)
            console.log('⚠️ Status field not found on render - hiding address fields by default');
            hideAddressViewFields();
        }
    }

    /**
     * Poll view_5600 field_4028 for processing status
     * Uses KTL refresh to get latest data every second
     * Must poll for at least 5 seconds (status might change to Loading in first 5 seconds)
     */
    function pollProcessingStatus() {
        processingPollAttempts++;

        const elapsedMs = Date.now() - processingPollStartTime;
        const hasMinimumTimePassed = elapsedMs >= MIN_POLL_DURATION_MS;

        console.log(`🔍 Polling processing status (attempt ${processingPollAttempts}/${MAX_POLL_ATTEMPTS}, elapsed: ${Math.round(elapsedMs / 1000)}s)`);

        // Refresh view_5600 to get latest data using KTL
        if (window.ktl && window.ktl.views && typeof window.ktl.views.refreshView === 'function') {
            window.ktl.views.refreshView('view_5600');
            console.log('🔄 Refreshed view_5600 using KTL');
        } else {
            console.warn('⚠️ KTL refresh not available, using Knack native refresh');
            if (typeof Knack !== 'undefined' && Knack.views && Knack.views.view_5600) {
                Knack.views.view_5600.model.fetch();
            }
        }

        // Wait a moment for the refresh to complete, then check the value
        setTimeout(function () {
            // Get the field value from view_5600 - it's in the kn-detail-body span
            const $statusField = $('#view_5600 .field_4028 .kn-detail-body span span');

            if ($statusField.length > 0) {
                const statusValue = $statusField.text().trim();
                console.log(`📊 Processing status: "${statusValue}"`);

                // Update field visibility based on processing status
                updateFieldVisibilityForProcessingStatus(statusValue);

                if (statusValue === 'Ready') {
                    // Only stop if minimum time has passed (5 seconds)
                    // Status might change to Loading in first 5 seconds
                    if (!hasMinimumTimePassed) {
                        console.log(`⏳ Status is Ready but minimum polling time not reached (${Math.round(elapsedMs / 1000)}s < 5s) - continuing to poll`);
                        lastProcessingStatus = statusValue;
                        return;
                    }

                    // Stop polling
                    if (processingPollTimer) {
                        clearInterval(processingPollTimer);
                        processingPollTimer = null;
                    }

                    // Only refresh views if we were previously in Loading state
                    // This avoids double-render when page loads with Ready status
                    if (lastProcessingStatus === 'Loading') {
                        console.log('✅ Processing complete! Refreshing view_5601 and view_5602');

                        // Refresh views using KTL
                        if (window.ktl && window.ktl.views && typeof window.ktl.views.refreshView === 'function') {
                            window.ktl.views.refreshView('view_5601');
                            console.log('🔄 Refreshed view_5601 using KTL');

                            window.ktl.views.refreshView('view_5602');
                            console.log('🔄 Refreshed view_5602 using KTL');
                        } else {
                            console.warn('⚠️ KTL refresh not available, using Knack native refresh');
                            if (typeof Knack !== 'undefined' && Knack.views) {
                                if (Knack.views.view_5601) {
                                    Knack.views.view_5601.model.fetch();
                                }
                                if (Knack.views.view_5602) {
                                    Knack.views.view_5602.model.fetch();
                                }
                            }
                        }
                    } else {
                        console.log('✅ Status is Ready (no transition from Loading) - skipping refresh');
                    }

                    processingPollAttempts = 0;
                    processingPollStartTime = null;
                    lastProcessingStatus = statusValue;
                    return;
                }

                // Track the status for next poll
                lastProcessingStatus = statusValue;
            } else {
                console.warn('⚠️ view_5600 field_4028 not found in DOM');
            }
        }, 300); // Wait 300ms for refresh to complete

        // Stop polling after max attempts (60 seconds)
        if (processingPollAttempts >= MAX_POLL_ATTEMPTS) {
            console.log('⏱️ Polling timeout reached (60 seconds) - stopping');
            if (processingPollTimer) {
                clearInterval(processingPollTimer);
                processingPollTimer = null;
            }
            // Show address fields even on timeout
            showAddressViewFields();
            processingPollAttempts = 0;
            processingPollStartTime = null;
        }
    }

    /**
     * Show view_5601 and view_5602 after view_5600 data is available
     * Note: Views are hidden by CSS by default (visibility: hidden)
     */
    function showContactDetailViews() {
        $('#view_5601').css('visibility', 'visible');
        $('#view_5602').css('visibility', 'visible');
        console.log('👁️ Showing view_5601 and view_5602');
    }

    /**
     * Start polling when scene_2397 renders
     */
    $(document).on('knack-scene-render.scene_2397', function (event, scene) {
        console.log('📍 Entered scene_2397 - starting processing status polling');

        // Note: "Back to Contacts" button hidden globally via CSS (href="#contacts6")
        // Note: view_5601 and view_5602 are hidden by CSS until ECN type is known

        // Clear any existing timer
        if (processingPollTimer) {
            clearInterval(processingPollTimer);
        }

        // Reset attempts counter and status tracking
        processingPollAttempts = 0;
        processingPollStartTime = Date.now(); // Track start time for 5 second minimum
        lastProcessingStatus = null; // Reset to avoid skipping refresh on first poll

        // Check if we have change tracking from form submission - hide address fields if needed
        if (window._updateCompanyChanges) {
            const changes = window._updateCompanyChanges;
            const hasChanges = changes.emailChanged || changes.phoneChanged || changes.addressChanged;

            if (hasChanges) {
                console.log('📋 Form submission with changes detected - hiding address view fields until Ready');
                // Small delay to ensure views are rendered, then hide address fields
                setTimeout(hideAddressViewFields, 500);

                // Force lastProcessingStatus to 'Loading' so we don't skip the refresh
                // when status becomes 'Ready' (since Make will set the status, not the form)
                lastProcessingStatus = 'Loading';
                console.log('📋 Set lastProcessingStatus to "Loading" to ensure refresh on Ready');
            } else {
                console.log('📋 Form submitted but no email/phone/address changes');
            }

            // Clear the change tracking now that we've used it
            delete window._updateCompanyChanges;
        }

        // Start polling every 1 second
        processingPollTimer = setInterval(pollProcessingStatus, 1000);
    });

    /**
     * Stop polling when leaving scene_2397
     */
    $(document).on('knack-scene-render', function (event, scene) {
        const currentScene = Knack.router.current_scene_key;

        if (currentScene !== 'scene_2397' && processingPollTimer) {
            console.log('🛑 Left scene_2397, stopping processing status polling');
            clearInterval(processingPollTimer);
            processingPollTimer = null;
            processingPollAttempts = 0;
        }
    });

    /**
     * Stop polling when Update Company or Update Contact button is clicked
     * The modal forms don't need the parent scene polling - KTL will refresh views on form close
     */
    function stopPollingForUpdateModal() {
        if (processingPollTimer) {
            console.log('🛑 Update button clicked - stopping processing status polling');
            clearInterval(processingPollTimer);
            processingPollTimer = null;
            processingPollAttempts = 0;
        }
    }

    /**
     * Attach click handlers to Update buttons in view_5601 to stop polling
     */
    $(document).on('knack-view-render.view_5601', function (event, view, data) {
        // Use namespaced event to prevent duplicate handlers
        $('#view_5601 a[href*="update-company"]').off('click.stopPolling').on('click.stopPolling', function () {
            console.log('🔘 Update Company button clicked');
            stopPollingForUpdateModal();
        });

        $('#view_5601 a[href*="update-contact"]').off('click.stopPolling').on('click.stopPolling', function () {
            console.log('🔘 Update Contact button clicked');
            stopPollingForUpdateModal();
        });
    });

    // ========================================================================
    // END CONTACT VIEW PROCESSING STATUS POLLING
    // ========================================================================

    /**
     * Show/hide elements based on ECN type (field_4219)
     * Individual: Show Update Contact only, hide Staff details (view_5634)
     * Organisation (Company/Charity/Trust/Gov/Other): Show Update Company + Add Contact + Staff details
     */
    function updateButtonVisibilityByEcnType() {
        // Get ECN type from view_5600 field_4219
        const $ecnTypeField = $('#view_5600 .field_4219 .kn-detail-body');
        const ecnType = $ecnTypeField.length > 0 ? $ecnTypeField.text().trim() : '';

        // Skip if ECN type field is empty (view_5600 hasn't loaded yet)
        if (!ecnType) {
            console.log('🔍 ECN Type (field_4219): "" - skipping (view_5600 not loaded yet)');
            return;
        }

        console.log(`🔍 ECN Type (field_4219): "${ecnType}"`);

        // Find the buttons in view_5601 (target the <a> element directly to override CSS)
        const $updateCompanyLink = $('#view_5601 a[href*="update-company"]');
        const $updateContactLink = $('#view_5601 a[href*="update-contact"]');
        const $addContactLink = $('#view_5601 a[href*="add-contact-to-company"]');

        // Staff details view (only for organisations)
        const $staffDetailsView = $('#view_5634');

        if (ecnType === 'Individual') {
            // Individual: Show Update Contact only, hide Staff details
            $updateCompanyLink.css('display', 'none');
            $updateContactLink.css('display', 'inline-block');
            $addContactLink.css('display', 'none');
            $staffDetailsView.css('display', 'none');
            console.log('👤 Individual ECN - showing Update Contact button only, hiding Staff details');
        } else {
            // Organisation: Show Update Company + Add Contact + Staff details
            $updateCompanyLink.css('display', 'inline-block');
            $updateContactLink.css('display', 'none');
            $addContactLink.css('display', 'inline-block');
            $staffDetailsView.css('display', 'block');
            console.log('🏢 Organisation ECN - showing Update Company + Add Contact + Staff details');
        }

        // Now show the detail views (they were hidden until ECN type was known)
        showContactDetailViews();
    }

    /**
     * Run on view_5600 render - this is where we know ECN type is available
     */
    $(document).on('knack-view-render.view_5600', function (event, view, data) {
        console.log('👀 view_5600 rendered - ECN type data available');

        // Small delay to ensure DOM is fully populated
        setTimeout(function() {
            updateButtonVisibilityByEcnType();
        }, 100);
    });

    /**
     * Run on view_5601 render
     */
    $(document).on('knack-view-render.view_5601', function (event, view, data) {
        console.log('👀 view_5601 rendered');

        // Immediately hide all action buttons with inline styles (before CSS potentially loads)
        // This ensures no flash - view_5600 handler will show the correct ones based on ECN type
        $('#view_5601 a[href*="update-company"]').css('display', 'none');
        $('#view_5601 a[href*="update-contact"]').css('display', 'none');
        $('#view_5601 a[href*="add-contact-to-company"]').css('display', 'none');
        console.log('🔒 All action buttons hidden on view_5601 render');

        // Check processing status and hide email/phone fields if Processing
        checkAndUpdateFieldVisibility();

        // If view_5600 has already rendered, show the correct button now
        // (handles case where view_5600 rendered before view_5601)
        updateButtonVisibilityByEcnType();
    });

    // ========================================================================
    // END HIDE HR DIVS
    // ========================================================================

    // ========================================================================
    // VIEW_5634 - MAKE NAME COLUMN CLICKABLE
    // ========================================================================

    /**
     * Convert the View Link column (field_4231) in view_5634 (contacts grid) to clickable buttons
     * Replaces plain URL text with styled button using tableBlueButton class and fa-eye icon
     */
    $(document).on('knack-view-render.view_5634', function (event, view, data) {
        console.log('👀 view_5634 (Staff Details) rendered');

        // Initially hide to prevent flash - visibility set by updateButtonVisibilityByEcnType()
        $('#view_5634').css('display', 'none');
        console.log('🔒 view_5634 hidden on render (waiting for ECN type check)');

        // If view_5600 has already rendered, check ECN type now
        updateButtonVisibilityByEcnType();

        // Show "New Contact pending..." message if flag is set (from view_5631 form submission)
        if (window._newContactPending) {
            // Remove any existing pending message first
            $('#new-contact-pending').remove();

            const $pendingMessage = $(`
                <div id="new-contact-pending" style="
                    background: #fff3cd;
                    border: 1px solid #ffc107;
                    border-radius: 4px;
                    padding: 12px 16px;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                ">
                    <i class="fa fa-spinner fa-spin" style="color: #856404;"></i>
                    <span style="color: #856404; font-weight: 500;">New Contact pending... Setting up communication channels.</span>
                </div>
            `);

            $('#view_5634').before($pendingMessage);
            console.log('⏳ Showing "New Contact pending..." message above view_5634');
        }

        // Process each row - convert field_4231 (View Link) URL to a styled button
        $('#view_5634 table tbody tr').each(function () {
            const $row = $(this);
            const $viewCell = $row.find('td.field_4231');
            const viewUrl = $viewCell.text().trim();

            if ($viewCell.length === 0) {
                console.warn('⚠️ field_4231 cell not found in row');
                return;
            }

            if (viewUrl) {
                console.log('🔗 Creating View button -> ' + viewUrl);

                // Replace URL text with styled table button
                $viewCell.html(
                    $('<a>')
                        .attr('href', viewUrl)
                        .addClass('tableBlueButton')
                        .html('<i class="fa fa-eye"></i> View')
                );
            } else {
                console.warn('⚠️ No View URL found for row');
            }
        });

        console.log('✅ View buttons applied to view_5634');
    });

    // ========================================================================
    // END VIEW_5634 CLICKABLE NAME COLUMN
    // ========================================================================

    // ========================================================================
    // END FORM VALIDATION AND WEBHOOK CONTROL SYSTEM
    // ========================================================================

}; // This closes the ktlReady function