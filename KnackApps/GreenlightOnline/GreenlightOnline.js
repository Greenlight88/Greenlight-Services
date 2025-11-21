window.APP_VERSION = '1.0.3'; // Added timestamp pulse animation on enquiries table refresh

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

        // Auto-refresh configuration for enquiries table
        autoRefresh: [
            {
                viewId: 'view_4829',      // Enquiries table
                sceneId: 'scene_1973',    // Scene where the view is rendered
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

    console.log('🔄 KTL Auto-refresh configured for view_4829');
    console.log('📋 Auto-refresh settings:', {
        viewId: 'view_4829',
        sceneId: 'scene_1973',
        interval: '60 seconds (KTL minimum)',
        onlyIfVisible: true,
        preserveScrollPos: true
    });

    // Check if KTL accepted our configuration
    setTimeout(function() {
        console.log('🔍 Checking KTL auto-refresh internals...');

        // Try to access KTL's internal configuration
        if (window.ktl && window.ktl.views) {
            console.log('✅ KTL views module exists');

            // Check if getCfg exists
            if (typeof window.ktl.views.getCfg === 'function') {
                const viewsCfg = window.ktl.views.getCfg();
                console.log('📦 KTL views configuration:', viewsCfg);

                if (viewsCfg.autoRefresh) {
                    console.log('✅ Auto-refresh config found:', viewsCfg.autoRefresh);
                } else {
                    console.warn('⚠️ No auto-refresh config in KTL views');
                }
            } else {
                console.warn('⚠️ ktl.views.getCfg not available');
            }

            // Check if refreshView function exists
            if (typeof window.ktl.views.refreshView === 'function') {
                console.log('✅ ktl.views.refreshView function exists');
            } else {
                console.warn('⚠️ ktl.views.refreshView not found');
            }
        } else {
            console.error('❌ KTL or ktl.views not available');
        }

        // Check KTL core config
        if (window.ktl && window.ktl.core && typeof window.ktl.core.getCfg === 'function') {
            const coreCfg = window.ktl.core.getCfg();
            console.log('📦 KTL core enabled features:', coreCfg.enabled);
        }
    }, 2000);

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

                    const result = validator.normalizeMobileNumber(fieldValue.trim());

                    // If validation failed, return the specific error message
                    if (!result.isValid) {
                        return {
                            isValid: false,
                            normalizedValue: '',
                            errorMessage: result.error || 'Please enter a valid mobile number'
                        };
                    }

                    // Apply normalized value to field
                    if (result.normalizedValue && result.normalizedValue !== fieldValue.trim()) {
                        $(config.selector).val(result.normalizedValue);
                    }

                    return result;
                },
                defaultMessage: 'Please enter a valid mobile number'
            },

            // Landline number validation with extensions
            'landline-number': {
                validate: function (config, fieldValue, $field) {
                    if (!fieldValue || fieldValue.trim() === '') {
                        return { isValid: true, normalizedValue: '', hasAreaCodeCorrection: false };
                    }

                    const result = validator.normalizeLandlineNumber(fieldValue.trim());

                    // If validation failed, return the specific error message
                    if (!result.isValid) {
                        return {
                            isValid: false,
                            normalizedValue: '',
                            hasAreaCodeCorrection: false,
                            errorMessage: result.error || 'Please enter a valid phone number'
                        };
                    }

                    // Apply normalized value to field
                    if (result.normalizedValue && result.normalizedValue !== fieldValue.trim()) {
                        $(config.selector).val(result.normalizedValue);
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
            },

            // Short name validation (optional field, no specific rules)
            'short-name': {
                validate: function (config, fieldValue, $field) {
                    // Optional field, always valid
                    return { isValid: true, normalizedValue: fieldValue ? fieldValue.trim() : '' };
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
                normalizeStreetAddress: function(address) {
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
                    normalized = normalized.replace(/\b\w+/g, function(word) {
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
                normalizeSuburb: function(suburb) {
                    if (!suburb || suburb.trim() === '') return '';
                    return suburb.trim().toUpperCase();
                },

                /**
                 * Normalize state
                 * - Convert to uppercase abbreviation
                 */
                normalizeState: function(state) {
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
                    let value = $(config.selector).val();
                    value = value ? value.trim() : '';

                    // Log detailed validation info including character codes
                    console.log(`📧 Validating email - Value: '${value}', Length: ${value.length}, Selector: ${config.selector}`);
                    if (value.length > 0) {
                        console.log(`   Character codes: ${Array.from(value).map(c => c.charCodeAt(0)).join(',')}`);
                    }

                    if (!value) {
                        return { isValid: true, normalizedValue: '' };
                    }

                    // Email validation pattern - RFC 5322 compliant with proper TLD validation
                    // Local part: allows standard email characters
                    // Domain: Must end with a TLD of at least 2 characters
                    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                    if (!emailPattern.test(value)) {
                        console.log(`❌ Email validation FAILED (pattern) for: '${value}'`);
                        return {
                            isValid: false,
                            normalizedValue: value,
                            errorMessage: 'Please enter a valid email address (e.g., name@company.com.au)'
                        };
                    }

                    // Additional validation: Check that TLD (last part after final dot) is at least 2 characters
                    const atIndex = value.indexOf('@');
                    const domain = value.substring(atIndex + 1);
                    const lastDotIndex = domain.lastIndexOf('.');

                    if (lastDotIndex === -1) {
                        console.log(`❌ Email validation FAILED (no TLD) for: '${value}'`);
                        return {
                            isValid: false,
                            normalizedValue: value,
                            errorMessage: 'Please enter a valid email address with a domain extension (e.g., .com, .com.au)'
                        };
                    }

                    const tld = domain.substring(lastDotIndex + 1);

                    // TLD validation:
                    // - Must be 2-24 characters (longest real TLD is .cancerresearch at 14 chars)
                    // - Must contain only letters (no numbers or special chars)
                    // - Cannot be all the same letter (e.g., .xx, .aaa)
                    if (tld.length < 2 || tld.length > 24) {
                        console.log(`❌ Email validation FAILED (TLD length invalid: '${tld}') for: '${value}'`);
                        return {
                            isValid: false,
                            normalizedValue: value,
                            errorMessage: 'Invalid domain extension - must be 2-24 letters (e.g., .com, .com.au)'
                        };
                    }

                    // Check TLD contains only letters
                    if (!/^[a-zA-Z]+$/.test(tld)) {
                        console.log(`❌ Email validation FAILED (TLD contains non-letters: '${tld}') for: '${value}'`);
                        return {
                            isValid: false,
                            normalizedValue: value,
                            errorMessage: 'Invalid domain extension - must contain only letters (e.g., .com, .au, not .x1)'
                        };
                    }

                    // Validate against known valid TLD patterns
                    // This comprehensive check catches fake TLDs like .xx, .xc, .zz, etc.
                    const invalidTLDPatterns = [
                        /^([a-z])\1+$/i,  // All same letter: xx, aaa, zzzz
                        /^[xyzq]{2}$/i,   // Two letter combos unlikely to be real: xx, xy, xz, qq, zz, etc.
                        /^[bcdfghjklmnpqrstvwxyz]{2}$/i  // Two consonants only (most 2-letter TLDs have at least one vowel)
                    ];

                    // Known valid 2-letter TLDs (country codes) - partial list of common ones
                    const validTwoLetterTLDs = [
                        'au', 'us', 'uk', 'ca', 'de', 'fr', 'it', 'es', 'nl', 'be', 'ch', 'at',
                        'se', 'no', 'dk', 'fi', 'ie', 'nz', 'jp', 'cn', 'kr', 'in', 'sg', 'hk',
                        'tw', 'th', 'my', 'ph', 'id', 'vn', 'ae', 'sa', 'il', 'tr', 'ru', 'ua',
                        'pl', 'cz', 'ro', 'gr', 'pt', 'hu', 'bg', 'hr', 'si', 'sk', 'lt', 'lv',
                        'ee', 'is', 'lu', 'mt', 'cy', 'mx', 'br', 'ar', 'cl', 'co', 'pe', 'za'
                    ];

                    const tldLower = tld.toLowerCase();

                    // For 2-letter TLDs, check against whitelist
                    if (tld.length === 2) {
                        if (!validTwoLetterTLDs.includes(tldLower)) {
                            console.log(`❌ Email validation FAILED (invalid 2-letter TLD: '${tld}') for: '${value}'`);
                            return {
                                isValid: false,
                                normalizedValue: value,
                                errorMessage: 'Invalid country code - please use valid domain extensions (e.g., .au, .com, .net, .org)'
                            };
                        }
                    }

                    // For any length, check against invalid patterns
                    for (const pattern of invalidTLDPatterns) {
                        if (pattern.test(tld)) {
                            console.log(`❌ Email validation FAILED (TLD matches invalid pattern: '${tld}') for: '${value}'`);
                            return {
                                isValid: false,
                                normalizedValue: value,
                                errorMessage: 'Invalid domain extension (e.g., use .com, .com.au, .net, .org, .edu, .gov)'
                            };
                        }
                    }

                    console.log(`✅ Email validation PASSED for: '${value}' (TLD: '${tld}')`);

                    // Split email into local part (before @) and domain (after @)
                    // (atIndex already declared above)
                    const localPart = value.substring(0, atIndex); // Keep original casing
                    const domainLower = domain.toLowerCase(); // Force lowercase

                    const normalizedEmail = localPart + '@' + domainLower;

                    // Apply normalized value to field if it changed
                    if (normalizedEmail !== value) {
                        $(config.selector).val(normalizedEmail);
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
                    if (!fieldValue || fieldValue.trim() === '') {
                        return { isValid: true, normalizedValue: '' };
                    }

                    const result = validator.normalizeLandlineNumber(fieldValue.trim());

                    // If validation failed, return the specific error message
                    if (!result.isValid) {
                        return {
                            isValid: false,
                            normalizedValue: '',
                            hasAreaCodeCorrection: false,
                            errorMessage: result.error || 'Please enter a valid phone number'
                        };
                    }

                    // Apply normalized value to field
                    if (result.normalizedValue && result.normalizedValue !== fieldValue.trim()) {
                        $(config.selector).val(result.normalizedValue);
                    }

                    return result;
                },
                defaultMessage: 'Please enter a valid phone number'
            },

            // Company name validation (allows any casing, normalizes Pty Ltd variants)
            'company-name': {
                validate: function (config, fieldValue, $field) {
                    if (!fieldValue || fieldValue.trim() === '') {
                        return { isValid: false, normalizedValue: '', hasWarning: false };
                    }

                    const originalValue = fieldValue.trim();

                    // Normalize Pty Ltd and Ltd variants
                    let normalized = originalValue
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

                    // Update field if normalization changed the value
                    const changed = normalized !== originalValue;
                    if (changed) {
                        $field.val(normalized);
                        console.log(`📝 Company name normalized: '${originalValue}' → '${normalized}'`);
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
                    url: 'https://hook.us1.make.com/k5x6x9cgrnxeotdocoqmkvfspe495am4',
                    enabled: true
                },
                postSubmissionWebhook: {
                    url: 'https://hook.us1.make.com/kncqr2skxuof3i5swdbnk2o9bbcoeqvw',
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
                    field_4057: {
                        rule: 'company-email',
                        selector: '#view_4059 input[name="email"]',
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
                    url: 'https://hook.us1.make.com/k5x6x9cgrnxeotdocoqmkvfspe495am4',
                    enabled: true
                },
                postSubmissionWebhook: {
                    url: 'https://hook.us1.make.com/kncqr2skxuof3i5swdbnk2o9bbcoeqvw',
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
                        selector: '#view_2406 input[name="email"]',
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
                    $errorDiv = $('<div class="kn-message is-error validation-error-message" style="margin-top: 5px; display: block !important; visibility: visible !important; opacity: 1 !important;"><span class="kn-message-body"></span></div>');
                    $field.append($errorDiv);
                    console.log(`➕ Created new error div for ${fieldId}`);
                } else {
                    console.log(`🔄 Updating existing error div for ${fieldId}`);
                }
                $errorDiv.find('.kn-message-body').text(message);
                $errorDiv.css({
                    'display': 'block',
                    'visibility': 'visible',
                    'opacity': '1'
                }).show();

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
                                error: `${firstFourDigits} numbers must be either 6 digits (${firstFourDigits.substring(0,4)} XX) or 10 digits (${firstFourDigits} XXX XXX)`,
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
            normalizeCompanyName: function(companyName) {
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
            normalizeStreetAddress: function(address) {
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
            normalizeEmail: function(email) {
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
            normalizePhone: function(phone) {
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
            buildPreSubmissionPayload: function(viewId, formData) {
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

                // Extract company_id from URL (for update forms)
                let ecnRecordId = null;
                try {
                    const hash = window.location.hash;
                    if (hash) {
                        const segments = hash.replace(/^#/, '').split('/');
                        if (segments.length >= 3 && segments[2]) {
                            ecnRecordId = segments[2];
                            console.log(`🏢 Extracted ECN record ID from URL: ${ecnRecordId}`);
                        }
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not extract ECN ID from URL:`, error);
                }

                // Get tenant_id (placeholder - you'll need to get this from your system)
                const tenantId = '648a5861b632b20027d53b8b'; // TODO: Get from config or form

                // Extract and normalize company data from formData
                // TODO: Update these field selectors based on your actual form fields
                const companyNameRaw = $('#view_' + viewId.split('_')[1] + ' input[name="field_992"]').val() || ''; // TODO: Update field ID
                const companyShortNameRaw = $('#view_' + viewId.split('_')[1] + ' input[name="field_XXX"]').val() || ''; // TODO: Add field ID
                const streetAddressRaw = $('#view_' + viewId.split('_')[1] + ' input[name="field_YYY"]').val() || ''; // TODO: Add field ID
                const emailRaw = $('#field_4057').val() || '';
                const phoneRaw = $('#field_4056').val() || '';

                // Normalize all fields
                const companyNameNormalised = companyNameRaw;
                const companySearch = this.normalizeCompanyName(companyNameRaw);
                const companyShortSearch = this.normalizeCompanyName(companyShortNameRaw);
                const streetAddressSearch = this.normalizeStreetAddress(streetAddressRaw);
                const formattedStreetAddress = streetAddressRaw; // TODO: Implement proper formatting
                const emailNormalised = this.normalizeEmail(emailRaw);
                const phoneNormalised = this.normalizePhone(phoneRaw);

                // Build base payload (common to both create and update)
                const payload = {
                    view: viewId,
                    form_type: formType,
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
                    street_address_search: streetAddressSearch,
                    formatted_street_address: formattedStreetAddress,
                    email_normalised: emailNormalised,
                    phone_normalised: phoneNormalised,
                    data: {
                        form_type: formType,
                        company_name_normalised: companyNameNormalised,
                        company_search: companySearch,
                        company_short_search: companyShortSearch,
                        street_address_search: streetAddressSearch,
                        formatted_street_address: formattedStreetAddress,
                        email_normalised: emailNormalised,
                        phone_normalised: phoneNormalised,
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
                } else {
                    // For creation forms, these fields should be null
                    payload.company_record_id = null;
                    payload.primary_email_record_id = null;
                    payload.primary_phone_record_id = null;

                    payload.data.company_record_id = null;
                    payload.data.primary_email_record_id = null;
                    payload.data.primary_phone_record_id = null;
                }

                // Store original values and change detection for post-submission webhook
                if (formType === 'company-update') {
                    window._originalFormValues = originalValues;
                    window._preSubmissionChangeDetection = changeDetection;
                    console.log(`📋 Stored original values and change detection for post-submission webhook`);
                }

                console.log(`📦 Built ${formType} payload:`, payload);
                return payload;
            },

            /**
             * Get existing record IDs from hidden view (for update forms only)
             */
            getExistingRecordIds: function(viewId) {
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
            getOriginalValues: function(viewId) {
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
            detectChanges: function(originalValues, companyName, companyShortName, streetAddress, email, phone) {
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
            buildPostSubmissionPayload: function(viewId, submissionResponse) {
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
                const emailRaw = storedFormData.field_4057 || '';
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

                // Use stored values from pre-submission webhook response, or build defaults
                let knackApiPayloads = [];
                let comActionType = 'create_all';
                let sharedComIds = '';
                let isTest = false;

                // Check if we have stored payloads from pre-submission webhook
                if (window._knackApiPayloads) {
                    // Use the payloads from Make.com
                    knackApiPayloads = window._knackApiPayloads;
                    console.log(`✅ Using knack_api_payloads from pre-submission response`);
                } else {
                    // Fallback: Build payloads from form data
                    const emailHasValue = emailNormalised && emailNormalised.trim() !== '';
                    const phoneHasValue = phoneNormalised && phoneNormalised.trim() !== '';

                    if (emailHasValue) {
                        knackApiPayloads.push({
                            field_4047: emailNormalised,
                            field_4048: tenantId
                        });
                    }

                    if (phoneHasValue) {
                        knackApiPayloads.push({
                            field_4047: phoneNormalised,
                            field_4048: tenantId
                        });
                    }
                    console.log(`⚠️ Built knack_api_payloads from form data (pre-submission response not available)`);
                }

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
                    knack_api_payloads: JSON.stringify(knackApiPayloads),
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
                    // Get existing record IDs from hidden view
                    const existingRecordIds = this.getExistingRecordIds(viewId);

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
            firePostSubmissionWebhook: function(viewId, submissionResponse) {
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

                        // Redirect to contact view if we have ECN ID
                        if (ecnId && viewId === 'view_4059') {
                            const redirectUrl = `#contacts6/view-contact3/${ecnId}`;
                            console.log(`🔀 Redirecting to contact view: ${redirectUrl}`);
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

                // Check if this is a company form
                const isCompanyForm = (config.formType === 'company-creation' || config.formType === 'company-update');

                let payload;

                if (isCompanyForm) {
                    // Use company-specific payload builder
                    console.log(`🏢 Detected company form: ${config.formType}`);
                    payload = companyFormHandler.buildPreSubmissionPayload(viewId, formData);
                } else {
                    // Use generic payload (for contact forms, etc.)
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

                // Store data from pre-submission response (for company forms)
                if (result.ecn_record_id) {
                    window._ecnRecordId = result.ecn_record_id;
                    console.log(`📌 Stored ECN record ID from pre-submission response: ${result.ecn_record_id}`);
                } else if (result.ecn_id) {
                    window._ecnRecordId = result.ecn_id;
                    console.log(`📌 Stored ECN record ID from pre-submission response: ${result.ecn_id}`);
                }

                // Store other values from pre-submission response
                if (typeof result.is_test !== 'undefined') {
                    window._isTest = result.is_test;
                    console.log(`📌 Stored is_test from pre-submission response: ${result.is_test}`);
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
                        this.blockSubmission(result, viewId, $form, $submitBtn, originalText);
                        break;

                    case 'confirm':
                        this.showConfirmationDialog(result, formData, viewId, $form, $submitBtn, originalText);
                        break;

                    case 'proceed':
                        this.proceedWithSubmission(formData, viewId, result);
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

                // IMPORTANT: Capture current form data before submission
                // This data will be used in post-submission webhook since form will be gone after redirect
                const formData = eventListeners.extractFormData(viewId);
                window._preSubmissionFormData = formData;
                console.log(`💾 Stored form data for post-submission webhook:`, formData);

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
                $button.find('.test-data-prefill-btn').on('click', function(e) {
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
                        utils.addFieldError(fieldId, errorMessage);
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
                                events = 'input blur';
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
                                // Get field value - handle both single selector and multiple selectors
                                const $field = fieldConfig.selector ? $(fieldConfig.selector) : $(this);
                                const fieldValue = $field.val() || '';

                                console.log(`🔍 Validating ${fieldId} (${fieldConfig.rule}) on ${events}`);

                                // Run validation
                                const result = ruleDefinition.validate(fieldConfig, fieldValue, $field);

                                if (result.isValid) {
                                    utils.removeFieldError(fieldId);

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
                                        utils.removeConfirmationMessage(fieldId);
                                        if (result.hasAreaCodeCorrection) {
                                            utils.addConfirmationMessage(fieldId, 'Please confirm area code');
                                            console.log(`🟢 Area code confirmation shown for ${fieldId}`);
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
                                    utils.addFieldError(fieldId, errorMessage);
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
             */
            setupAddressAutocompleteListeners: function () {
                Object.keys(viewConfigs).forEach(viewId => {
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
                            const $field = $(selector);

                            if ($field.length === 0) {
                                console.log(`⚠️ Address field ${subField} not found: ${selector}`);
                                return;
                            }

                            // Use input event to catch autocomplete changes
                            // Google autocomplete triggers 'input' event when filling fields
                            $(document).on('input change', selector, function() {
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
                });
            },

            /**
             * Normalizes address fields after autocomplete fills them
             */
            normalizeAddressFieldsAfterAutocomplete: function(viewId, fieldId, fieldConfig) {
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

                // Set up post-submission webhook listeners for company forms
                $(document).on('knack-form-submit.view_4059', function (event, view, response) {
                    console.log(`📝 Form submission completed for view_4059 (company-creation)`);
                    console.log(`📦 Submission response:`, response);

                    // Fire post-submission webhook immediately
                    // The webhook will create the ECN and return the ecn_id for redirect
                    console.log(`🚀 Firing post-submission webhook (will redirect after response)`);
                    companyFormHandler.firePostSubmissionWebhook('view_4059', response);
                });

                $(document).on('knack-form-submit.view_2406', function (event, view, response) {
                    console.log(`📝 Form submission completed for view_2406 (company-update)`);
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

                    // Fire post-submission webhook (update forms may not need redirect)
                    setTimeout(() => {
                        console.log(`⏱️ Firing post-submission webhook for update form`);
                        companyFormHandler.firePostSubmissionWebhook('view_2406', response);
                    }, 1000);
                });

                // Add test data prefill buttons to configured views
                $(document).on('knack-view-render.any', function (event, view, data) {
                    const viewId = view.key;
                    if (viewConfigs[viewId]) {
                        // Small delay to ensure form is fully rendered
                        setTimeout(() => {
                            testDataGenerator.addPrefillButton(viewId);
                        }, 100);

                        // Validate prefilled fields for company forms
                        if (viewId === 'view_4059' || viewId === 'view_2406') {
                            console.log(`📋 Company form (${viewId}) rendered - checking for prefilled fields`);
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
        normalizeSpaces: function(str) {
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
        toProperCase: function(str) {
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
        register: function(config) {
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
        init: function(cfg) {
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
        setupLiveSearch: function(cfg) {
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
            $searchInput.on('keydown', function(e) {
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
            $searchInput.on('input', function() {
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
            $searchContainer.find('.search-clear').on('click', function() {
                XeroStyleSearch.hideAddNewLink($searchContainer);
            });

            console.log(`   ✅ Live search initialized for ${cfg.entityName}`);
        },

        /**
         * Filter table using server-side search with MutationObserver
         */
        filterTableDirectly: function(viewId, searchTerm) {
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
        normalizeCompanyName: function(name) {
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
        checkForDuplicate: function(cfg, searchTerm) {
            if (!cfg.checkForExactMatch || !cfg.connectionTypeFieldId) {
                return null;
            }

            const $tableRows = $(`#${cfg.listViewId} tbody tr`);
            let exactMatch = null;
            const searchTermLower = searchTerm.toLowerCase().trim();
            const searchTermNormalized = this.normalizeCompanyName(searchTerm);

            console.log(`   🔍 Checking for duplicates. Search term: "${searchTermLower}", Normalized: "${searchTermNormalized}", Rows found: ${$tableRows.length}`);

            $tableRows.each(function(index) {
                const $row = $(this);
                const $cells = $row.find('td');

                // Check ALL cells to find the name (first cell might be ID)
                let foundMatchInRow = false;
                let matchedCellIndex = -1;

                $cells.each(function(cellIndex) {
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

                    $cells.each(function(cellIndex) {
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
        showAddNewLink: function(cfg, searchTerm, $container) {
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
        toProperCase: function(text) {
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
        showEntityTypeModal: function(cfg, searchTerm) {
            const properCaseTerm = this.toProperCase(searchTerm);
            console.log(`   📋 Showing entity type modal for: "${properCaseTerm}"`);

            // Create modal HTML
            const modalHtml = `
                <div class="xero-entity-modal-overlay">
                    <div class="xero-entity-modal">
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

            // Add Company button
            $modal.find('.xero-entity-company').on('click', () => {
                console.log(`   ✅ User chose: Add Company`);
                this.clickHiddenButton(cfg.modalButtons.company, searchTerm);
                $modal.remove();
            });

            // Add Contact button
            $modal.find('.xero-entity-contact').on('click', () => {
                console.log(`   ✅ User chose: Add Contact`);
                this.clickHiddenButton(cfg.modalButtons.contact, searchTerm);
                $modal.remove();
            });

            // Cancel button
            $modal.find('.xero-entity-modal-cancel').on('click', () => {
                console.log(`   ❌ User cancelled`);
                $modal.remove();
            });

            // Click outside to close
            $modal.on('click', function(e) {
                if ($(e.target).hasClass('xero-entity-modal-overlay')) {
                    $modal.remove();
                }
            });

            // Show modal with animation
            setTimeout(() => {
                $modal.addClass('xero-entity-modal-show');
            }, 10);
        },

        /**
         * Click a hidden button on view_5576 by button text
         */
        clickHiddenButton: function(buttonText, searchTerm) {
            console.log(`   🔘 Clicking hidden button: "${buttonText}"`);

            const $button = $(`#view_5576 a:contains("${buttonText}")`);

            if ($button.length) {
                // Store search term and button type for prefill
                window.xeroSearchTerm = searchTerm;
                window.xeroButtonType = buttonText.toLowerCase().includes('company') ? 'company' : 'contact';
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
        hideAddNewLink: function($container) {
            const $link = $container.find('.xero-add-new-link');
            if ($link.length) {
                $link.addClass('xero-hidden');
            }
            // Note: We don't remove highlights here anymore - they're managed in showAddNewLink
        },

        /**
         * Open form and prefill name field
         */
        openFormWithPrefill: function(cfg, searchTerm) {
            console.log(`   📝 Opening form for: "${searchTerm}"`);

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
        setupPrefillHandler: function() {
            // Listen for any view render
            const prefillHandler = function() {
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
        toProperCase: function(text) {
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

        /**
         * Prefill company form (view_4059, scene_1653)
         */
        prefillCompanyForm: function(searchTerm) {
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
                    $('.kn-modal input:visible, #view_4059 input:visible, .kn-scene-1653 input:visible').each(function(i) {
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
         * Prefill contact form with name field
         */
        prefillContactForm: function(searchTerm) {
            console.log(`   🔍 Looking for contact form fields...`);

            // Wait a bit for form to fully render
            setTimeout(() => {
                // Convert to proper case
                const properCaseTerm = this.toProperCase(searchTerm.trim());
                const words = properCaseTerm.split(/\s+/);

                // Find the name field inputs (field_3967) - try multiple selectors
                let $firstNameInput = $('#kn-input-field_3967 input#first');
                let $lastNameInput = $('#kn-input-field_3967 input#last');

                if (!$firstNameInput.length) {
                    $firstNameInput = $('#kn-input-field_3967 input[name="first"]');
                }
                if (!$lastNameInput.length) {
                    $lastNameInput = $('#kn-input-field_3967 input[name="last"]');
                }

                console.log(`   🔍 Name field search: First=${$firstNameInput.length}, Last=${$lastNameInput.length}`);

                if ($firstNameInput.length && $lastNameInput.length) {
                    if (words.length >= 2) {
                        // Two or more words - first word to First, rest to Last
                        const firstName = words[0];
                        const lastName = words.slice(1).join(' ');

                        $firstNameInput.val(firstName);
                        $lastNameInput.val(lastName);
                        $firstNameInput.trigger('change');
                        $lastNameInput.trigger('change');

                        console.log(`   ✅ Prefilled Name (Proper Case): First="${firstName}", Last="${lastName}"`);

                        // Focus on field_3984
                        setTimeout(() => {
                            let $nextField = $('#field_3984');
                            if (!$nextField.length) {
                                $nextField = $('input[name="field_3984"]');
                            }
                            if (!$nextField.length) {
                                $nextField = $('#kn-input-field_3984 input');
                            }

                            console.log(`   🔍 Next field (field_3984) search: found ${$nextField.length} elements`);

                            if ($nextField.length) {
                                $nextField.focus();
                                console.log(`   ✅ Focus set to field_3984`);
                            } else {
                                console.warn(`   ⚠ field_3984 not found`);
                            }
                        }, 100);
                    } else {
                        // Single word - goes to First, focus on Last
                        $firstNameInput.val(properCaseTerm);
                        $firstNameInput.trigger('change');

                        console.log(`   ✅ Prefilled First Name (Proper Case) with: "${properCaseTerm}"`);

                        // Focus on Last name field
                        setTimeout(() => {
                            $lastNameInput.focus();
                            console.log(`   ✅ Focus set to Last Name field`);
                        }, 100);
                    }
                } else {
                    console.warn(`   ⚠ Name field inputs not found (field_3967). Available inputs:`);
                    $('input[type="text"]').each(function(i) {
                        console.log(`      Input ${i}: id="${this.id}", name="${this.name}", placeholder="${$(this).attr('placeholder')}"`);
                    });
                }
            }, 500);
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
    let view4829RefreshPaused = false;

    // Function to start the refresh timer
    function startView4829Refresh() {
        if (view4829RefreshTimer) {
            clearInterval(view4829RefreshTimer);
        }

        view4829RefreshTimer = setInterval(function() {
            // Only refresh if view is active, not paused, and on correct scene
            if (view4829IsActive && !view4829RefreshPaused && Knack.router.current_scene_key === 'scene_1973') {
                console.log('⏰ 10 seconds elapsed - refreshing view_4829...');

                // Call KTL's refresh function
                if (window.ktl && window.ktl.views && typeof window.ktl.views.refreshView === 'function') {
                    window.ktl.views.refreshView('view_4829');
                    console.log('✅ Called ktl.views.refreshView for view_4829');
                } else {
                    // Fallback to Knack's native refresh
                    console.warn('⚠️ KTL refresh not available, using Knack native refresh');
                    Knack.views['view_4829'].model.fetch();
                }
            }
        }, 10000); // 10 seconds

        console.log('✅ Started 10-second auto-refresh for view_4829');
    }

    // Function to update button text and icon
    function updateRefreshButton() {
        const $button = $('#view_4829_refresh_toggle');
        if ($button.length) {
            if (view4829RefreshPaused) {
                $button.html('▶️ Resume Auto-Refresh');
                $button.css('background-color', '#4CAF50');
            } else {
                $button.html('⏸️ Pause Auto-Refresh');
                $button.css('background-color', '#ff9800');
            }
        }
    }

    // Function to pulse the timestamp
    function pulseTimestamp() {
        const $timestamp = $('#view_4829-timestamp-id');
        if ($timestamp.length) {
            console.log('⏱️ Pulsing timestamp after refresh');

            // Add pulse animation
            $timestamp.css({
                'animation': 'ktl-timestamp-pulse 1s ease-out',
                'animation-fill-mode': 'forwards'
            });

            // Remove animation after it completes
            setTimeout(function() {
                $timestamp.css('animation', '');
            }, 1000);
        }
    }

    // Monitor when view_4829 is rendered - start custom refresh and add button
    $(document).on('knack-view-render.view_4829', function(event, view, data) {
        console.log('🔍 view_4829 (Enquiries Table) rendered');
        console.log('📍 Current scene:', Knack.router.current_scene_key);
        console.log('📊 Number of records:', data && data.length ? data.length : 'unknown');

        // Pulse the timestamp when view renders (indicates refresh)
        setTimeout(pulseTimestamp, 100);

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

            // Add pause/resume button (only once)
            if ($('#view_4829_refresh_toggle').length === 0) {
                const $button = $('<button>')
                    .attr('id', 'view_4829_refresh_toggle')
                    .css({
                        'position': 'fixed',
                        'top': '80px',
                        'right': '20px',
                        'z-index': '9999',
                        'padding': '10px 20px',
                        'background-color': '#ff9800',
                        'color': 'white',
                        'border': 'none',
                        'border-radius': '5px',
                        'cursor': 'pointer',
                        'font-weight': 'bold',
                        'box-shadow': '0 2px 5px rgba(0,0,0,0.2)',
                        'transition': 'all 0.3s ease'
                    })
                    .html('⏸️ Pause Auto-Refresh')
                    .on('click', function() {
                        view4829RefreshPaused = !view4829RefreshPaused;
                        updateRefreshButton();

                        if (view4829RefreshPaused) {
                            console.log('⏸️ Auto-refresh paused by user');
                        } else {
                            console.log('▶️ Auto-refresh resumed by user');
                        }
                    })
                    .on('mouseenter', function() {
                        $(this).css('transform', 'scale(1.05)');
                    })
                    .on('mouseleave', function() {
                        $(this).css('transform', 'scale(1)');
                    });

                $('body').append($button);
                console.log('✅ Added pause/resume button for auto-refresh');
            }

            // Start the refresh timer
            startView4829Refresh();
        }
    });

    // Stop refresh when leaving scene_1973
    $(document).on('knack-scene-render', function(event, scene) {
        const currentScene = Knack.router.current_scene_key;

        // If we left scene_1973, stop the refresh timer and remove button
        if (currentScene !== 'scene_1973' && view4829RefreshTimer) {
            console.log('🛑 Left scene_1973, stopping view_4829 auto-refresh');
            clearInterval(view4829RefreshTimer);
            view4829RefreshTimer = null;
            view4829IsActive = false;
            view4829RefreshPaused = false;

            // Remove the button
            $('#view_4829_refresh_toggle').remove();
        }

        // Log when we enter scene_1973
        if (currentScene === 'scene_1973') {
            console.log('🏠 scene_1973 (Enquiries Scene) rendered');
            console.log('✅ Custom 10-second auto-refresh will start when view_4829 renders');
        }
    });

    // ========================================================================
    // END CUSTOM AUTO-REFRESH
    // ========================================================================

    // ========================================================================
    // END FORM VALIDATION AND WEBHOOK CONTROL SYSTEM
    // ========================================================================

}; // This closes the ktlReady function