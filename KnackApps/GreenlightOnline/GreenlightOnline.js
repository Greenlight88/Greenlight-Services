window.APP_VERSION = '1.0.1';

window.ktlReady = function (appInfo = {}) {
    var ktl = new Ktl($, appInfo);

    ktl.core.setCfg({
        developerNames: ['Michael Tierney'],
        developerEmail: 'michael@greenlightservices.com.au',
        devOptionsPin: '9136',

        //Main KTL feature switches.  Here is where your App can override the defaults and enable/disable the features.
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

            //Those below must also be set up properly to have any effect.  See documentation.
            iFrameWnd: true,

            bulkOps: {
                bulkEdit: true,
                bulkCopy: true,
                bulkDelete: true,
                bulkAction: true,
            },
        },

        popupStyle: {
            success: ';background-color:#81b378;border:5px solid #294125',
            warning: ';background-color:#fffa5e;border:2px solid #7e8060',
            error: ';background-color:#FFB0B0;border:5px solid #660000',
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
            ktlTtipIconTableViewColor: '#222222',
        },

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

    //Features that do not apply to the iFrameWnd.
    if (!window.self.frameElement) {
        ktl.scenes.setCfg({
            ktlKioskButtons: {
                ADD_REFRESH: {
                    html: '<i class="fa fa-refresh"></i>',
                    id: 'kn-button-refresh',
                    href: function () { location.reload(); },
                    scenesToExclude: [''],
                },
                ADD_BACK: {
                    html: '<i class="fa fa-arrow-left"></i>',
                    id: 'kn-button-back',
                    href: function () { window.history.back(); },
                    scenesToExclude: [''],
                },
                ADD_DONE: {
                    html: '<i class="fa fa-check-square-o"></i>',
                    id: 'kn-button-done',
                    href: function () { /* Your done function here */ },
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

        /* Override header styling */
        .kn-content .view-header:has(.ktlHideShowButton) {
            background-color: #39b54a !important;
            border: 2px solid #39b54a !important;
            box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
            transition: all 0.3s ease !important;
        }

        /* Hover effects */
        .kn-content .view-header:has(.ktlHideShowButton):hover {
            background-color: #039b17 !important;
            border-color: #039b17 !important;
        }

        /* Title styling */
        .kn-content .view-header:has(.ktlHideShowButton) .kn-title {
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

    //KTL Setup - END


    //KTL callbacks to your App - BEGIN
    //KTL callbacks to your App - END

    /////////////////////////////////////////////////
    //Your App-specific code goes here...

///Add Favicon to Subdomain with Hash-based Icons
$(document).on('knack-scene-render.any', function(event, scene) {
  function updateFavicon() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    
    // Get the current hash from the URL
    var hash = window.location.hash;
    var pathname = window.location.pathname;
    var fullUrl = window.location.href;
    
    // Debug - remove these console.logs after testing
    console.log('Current hash:', hash);
    console.log('Current pathname:', pathname);
    console.log('Full URL:', fullUrl);
    
    // Check for specific hashes and set appropriate favicon and title
    if (hash === '#enquiries5' || fullUrl.includes('#enquiries5')) {
      // Green 'E' favicon
      console.log('Setting E favicon');
      link.href = 'https://s3.ap-southeast-2.amazonaws.com/ap-southeast-2-assets.knack.com/assets/5c14a85b4726bd086c90877c/683e526f66188e0290085e01/original/greenefavicon.png';
      document.title = 'Enquiries';
    } else if (hash === '#reports3' || fullUrl.includes('#reports3')) {
      // Green 'R' favicon
      console.log('Setting R favicon');
      link.href = 'https://s3.ap-southeast-2.amazonaws.com/ap-southeast-2-assets.knack.com/assets/5c14a85b4726bd086c90877c/683e532d66188e0290085e2f/original/greenrfavicon.png';
      document.title = 'Reports';
    } else {
      // Default favicon
      console.log('Setting default favicon');
      link.href = 'https://greenlightservices.com.au/wp-content/uploads/fbrfg/favicon-48x48.png';
      // You can set a default title here if needed, or leave it as is
      // document.title = 'Your Default Title';
    }
    
    // Remove existing favicon links to avoid conflicts
    var existingLinks = document.querySelectorAll("link[rel*='icon']");
    existingLinks.forEach(function(existingLink) {
      if (existingLink !== link) {
        existingLink.remove();
      }
    });
    
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  
  // Also listen for hash changes to update favicon dynamically
  function handleHashChange() {
    updateFavicon();
  }
  
  // Update favicon on initial load
  updateFavicon();
  
  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange);
});
///End Favicon

$(document).on('knack-page-render.any', function () {
    if ($('.kn-login').length) {
        $('#knack-body, .kn-scenes').addClass('loginPage');
    } else {
        $('#knack-body, .kn-scenes').removeClass('loginPage');
    }
    $('#knack-body.loginPage .login_form #forgot-pass').text('Forget your password?');
    $('#knack-body.loginPage .login_form .kn-button.is-primary').val('Continue');
    $('#knack-body.loginPage .login_form').before('<div class="line"><div class="bg-emphasis"></div><span class="text-subtle text-xs">or</span><div class="bg-emphasis"></div></div>');
});

    $(document).ready(function () {
        // Define the HTML to be inserted

        $(document).on('click', '#need-account .register.kn-button', function () {
            var htmlToInsert = '<div class="line"><div class="bg-emphasis"></div><span class="text-subtle text-xs">or</span><div class="bg-emphasis"></div></div>';
            // Insert the HTML after the element with class 'view-header'
            var checkExist = setInterval(function () {
                if ($('#register_all_users').length) {
                    // Element exists, insert the HTML after the .view-header element
                    $('#register_all_users .view-header').after(htmlToInsert);

                    // Clear the interval
                    clearInterval(checkExist);
                }
            }, 300);

            var forgetPassHtml = '<div class="forget-pass"><a tabindex="5" class="ang-link" id="forgot-pass" href="#welcome-page/knack-password/forgot">Forgot your password?</a></div>';

            var checkPass = setInterval(function () {
                if ($('#register_all_users').length) {
                    // Element exists, insert the HTML after the .view-header element
                    $('#register_all_users .kn-input-password').after(forgetPassHtml);

                    // Clear the interval
                    clearInterval(checkPass);
                }
            }, 300);





        });



         var confirmClass = setInterval(function () {
            $('#kn-scene_1789').closest('#knack-body').addClass('loginPage confirmPage');
            if ($('#knack-body.loginPage').length) {
                clearInterval(confirmClass);
            }
        }, 300);
               var confirmClass = setInterval(function () {
            $('#kn-scene_1791').closest('#knack-body').addClass('loginPage confirmPage');
            if ($('#knack-body.loginPage').length) {
                clearInterval(confirmClass);
            }
        }, 300);

        var confirmClass1 = setInterval(function () {
            $('#kn-scene_1792').closest('#knack-body').addClass('loginPage confirmPage');
            if ($('#knack-body.loginPage').length) {
                clearInterval(confirmClass1);
            }
        }, 300);

        var confirmClass1 = setInterval(function () {
            $('#kn-scene_1811').closest('#knack-body').addClass('loginPage confirmPage');
            if ($('#knack-body.loginPage').length) {
                clearInterval(confirmClass1);
            }
        }, 300);

        $(document).on('click', '#forgot-pass', function () {
            var checkBtnClass = setInterval(function () {
                if ($('#knack-reset-pass').length) {
                    $('#knack-reset-pass button').removeClass('kn-button');
                    clearInterval(checkBtnClass);
                }
            }, 0);
        });


    });
// Handle centralized authentication for direct access Knack app
$(document).on('knack-scene-render.any', function(event, scene) {
    // Check if user is logged in
    const isLoggedIn = Knack.getUserAttributes() !== "No user found";
    
    // Get the current hash (without the #)
    const currentHash = window.location.hash.substring(1);
    
    // Don't do redirects on the welcome page or when already logged in
    if (currentHash.startsWith('welcome-page') || isLoggedIn) {
        // If we're on the welcome page after login and there's a return_to parameter,
        // redirect to the saved destination
        if (isLoggedIn && currentHash.startsWith('welcome-page')) {
            const urlParams = new URLSearchParams(window.location.search);
            const returnTo = urlParams.get('return_to');
            
            if (returnTo) {
                // Clear the return_to parameter from the URL
                window.history.replaceState({}, document.title, 
                    window.location.pathname + window.location.hash.split('?')[0]);
                
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
$(document).on('knack-scene-render.scene_258', function(event, scene) {
 //Adjust scene here if login page changes
    
    // Store the return_to parameter from the URL if it exists
    const urlParams = new URLSearchParams(window.location.search);
    const returnTo = urlParams.get('return_to');
    
    if (returnTo) {
        // Store in localStorage to retrieve after authentication
        localStorage.setItem('knack_return_to', returnTo);
    }
});

// After successful login, check for stored return URL
$(document).on('knack-user-logged-in.any', function(event) {
    const returnTo = localStorage.getItem('knack_return_to');
    
    if (returnTo) {
        // Clear the stored value
        localStorage.removeItem('knack_return_to');
        
        // Redirect to the stored destination
        window.location.hash = returnTo;
    }
});
// Click handler for multiple filter views
function initializeFilterClicks() {
    // Array of view IDs that have filter buttons (removed duplicate view_4829)
    const filterViews = ['view_3503', 'view_4791', 'view_4793', 'view_4795', 'view_4798', 'view_4800', 'view_4803', 'view_4804', 'view_4829', 'view_4860', 'view_4870'];
    
    // Create selector string for all views
    const viewSelectors = filterViews.map(viewId => 
        `#${viewId} div.kn-records-nav div.js-filter-menu.tabs.is-toggle.is-flush a`
    ).join(', ');
    
    $(document).off('mousedown.filterInteractive');
    $(document).on('mousedown.filterInteractive', viewSelectors, function(e) {
        const $button = $(this);
        
        // Add clicking class for animation
        $button.addClass('clicking');
        
        // Remove clicking class after short delay
        setTimeout(() => {
            $button.removeClass('clicking');
        }, 150);
    });
}

// Initialize on document ready
$(document).ready(function() {
    initializeFilterClicks();
});
} 
