window.APP_VERSION = '1.0.0';

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
            userFilters: true,
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
        ktlOutlineColor: 'green',
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

    //KTL Setup - END


    //KTL callbacks to your App - BEGIN
    //KTL callbacks to your App - END

    /////////////////////////////////////////////////
    //Your App-specific code goes here...
    ///Add Favicon

    $(document).on('knack-scene-render.any', function(event, scene) {
  function updateFavicon() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png'; // Explicitly set the type to image/png
    link.rel = 'shortcut icon';
    link.href = 'https://greenlightservices.com.au/wp-content/uploads/fbrfg/favicon-48x48.png';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  updateFavicon();
});

/// REmove Bullets from text in rich field

    // Function to remove bullets from unordered lists in Knack grid cells
    function removeBulletsFromGrid() {
      // Target all cells in the grid that might contain rich text
      const gridCells = document.querySelectorAll('#view_837 .kn-table td');
      
      gridCells.forEach(cell => {
        // Find unordered lists within each cell
        const ulElements = cell.querySelectorAll('ul');
        
        // Apply styling to remove bullets for each list
        ulElements.forEach(ul => {
          ul.style.listStyleType = 'none';
          ul.style.paddingLeft = '0';
          
          // Optional: adjust list item spacing
          const listItems = ul.querySelectorAll('li');
          listItems.forEach(li => {
            li.style.marginBottom = '5px';
          });
        });
      });
    }

    // Initial load: Call when the view first renders
    $(document).on('knack-view-render.view_837', function(event, view, data) {
      removeBulletsFromGrid();
    });

    // Handle pagination: Call when page changes
    $(document).on('knack-page-render.view_837', function(event, view, data) {
      removeBulletsFromGrid();
    });

    // Handle search: Call when search results are displayed
    $(document).on('knack-records-render.view_837', function(event, view, records) {
      removeBulletsFromGrid();
    });
        
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
            $('#kn-scene_234').closest('#knack-body').addClass('loginPage confirmPage');
            if ($('#knack-body.loginPage').length) {
                clearInterval(confirmClass);
            }
        }, 300);
        var confirmClass = setInterval(function () {
            $('#kn-scene_328').closest('#knack-body').addClass('loginPage confirmPage');
            if ($('#knack-body.loginPage').length) {
                clearInterval(confirmClass);
            }
        }, 300);
        var confirmClass1 = setInterval(function () {
            $('#kn-scene_192').closest('#knack-body').addClass('loginPage confirmPage');
            if ($('#knack-body.loginPage').length) {
                clearInterval(confirmClass1);
            }
        }, 300);
        var confirmClass1 = setInterval(function () {
            $('#kn-scene_280').closest('#knack-body').addClass('loginPage confirmPage');
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

///Dynamic Display
$(document).on('knack-view-render.any', function(event, view) {
    // Original asbestos information formatting function
   function formatAsbestosInfo(originalText) {
    // Check if text exists
    if (!originalText) return originalText;
    
    // Extract the values using regex or split
    const parts = originalText.split('|').map(part => part.trim());
    
    if (parts.length !== 2) return originalText; // Return original if not in expected format
    
    const extent = parseFloat(parts[0]);
    const occurrences = parseInt(parts[1]);
    
    // Case 1: No asbestos identified
    if (extent === 0 && occurrences === 0) {
      return "None Identified";
    }
    
    // Case 2: Format based on extent and occurrences
    let formattedExtent = extent;
    
    // If extent is a whole number, remove decimal part
    if (extent === Math.floor(extent)) {
      formattedExtent = Math.floor(extent);
    }
    
    // Plural or singular for "location"
    const locationText = occurrences === 1 ? "location" : "locations";
    
    return `${formattedExtent} m<sup>2</sup> in ${occurrences} ${locationText}`;
  }
  
  // New function for removed asbestos information
  function formatRemovedAsbestosInfo(originalText) {
    // Check if text exists
    if (!originalText) return originalText;
    
    // Extract the values using regex or split
    const parts = originalText.split('|').map(part => part.trim());
    
    if (parts.length !== 2) return originalText; // Return original if not in expected format
    
    const extent = parseFloat(parts[0]);
    const locations = parseInt(parts[1]);
    
    // Case 1: No asbestos removed
    if (extent === 0 && locations === 0) {
      return "All remains in-situ";
    }
    
    // Case 2: Format based on extent and locations
    let formattedExtent = extent;
    
    // If extent is a whole number, remove decimal part
    if (extent === Math.floor(extent)) {
      formattedExtent = Math.floor(extent);
    }
    
    // Plural or singular for "location"
    const locationText = locations === 1 ? "location" : "locations";
    
    return `${formattedExtent} m<sup>2</sup> removed from ${locations} ${locationText}`;
  }
  
  // Define the fields that need formatting
  const fieldsToFormat = [
    // Asbestos Information - Details views
    { fieldId: 'field_1423', viewType: 'detail', formatter: formatAsbestosInfo },
    { fieldId: 'field_1425', viewType: 'detail', formatter: formatAsbestosInfo },
    { fieldId: 'field_1426', viewType: 'detail', formatter: formatAsbestosInfo },
    { fieldId: 'field_1417', viewType: 'detail', formatter: formatAsbestosInfo },
    { fieldId: 'field_1419', viewType: 'detail', formatter: formatAsbestosInfo },
    { fieldId: 'field_1420', viewType: 'detail', formatter: formatAsbestosInfo },
    
    // Asbestos Information - Table views
    { fieldId: 'field_1407', viewType: 'table', formatter: formatAsbestosInfo },
    { fieldId: 'field_1421', viewType: 'table', formatter: formatAsbestosInfo },
    { fieldId: 'field_1422', viewType: 'table', formatter: formatAsbestosInfo },
    { fieldId: 'field_1427', viewType: 'table', formatter: formatAsbestosInfo },
    { fieldId: 'field_1428', viewType: 'table', formatter: formatAsbestosInfo },
    { fieldId: 'field_1429', viewType: 'table', formatter: formatAsbestosInfo },
    
    // Removed Asbestos Information - Details views
    { fieldId: 'field_1424', viewType: 'detail', formatter: formatRemovedAsbestosInfo },
    { fieldId: 'field_1418', viewType: 'detail', formatter: formatRemovedAsbestosInfo },
    
    // Removed Asbestos Information - Table views
    { fieldId: 'field_1408', viewType: 'table', formatter: formatRemovedAsbestosInfo },
    { fieldId: 'field_1430', viewType: 'table', formatter: formatRemovedAsbestosInfo }
  ];
  
  // Format each field
  fieldsToFormat.forEach(field => {
    let selector;
    
    // CORRECTED: Adjust selector based on view type
    if (field.viewType === 'detail') {
      // More specific selector that only targets the field value content
      selector = `#${view.key} .kn-detail.${field.fieldId} .kn-detail-body`;
    } else if (field.viewType === 'table') {
      selector = `#${view.key} .${field.fieldId}.cell-edit, #${view.key} .${field.fieldId}:not(.cell-edit)`;
    }
    
    // Find and format all instances of this field in the current view
    const fieldElements = $(selector);
    
    fieldElements.each(function() {
      const $element = $(this);
      const originalText = $element.text();
      const formattedText = field.formatter(originalText);
      
      // Use html() instead of text() to render the HTML tags
      $element.html(formattedText);
    });
  });
});

///Restrict Dropdown - Copy the restrictedFields JSON to create other grids etc
$(document).on('knack-view-render.any', function(event, view) {
  // Configuration for fields with restricted options
  const restrictedFields = [
    {
      viewId: 'view_853',
      fieldId: 'field_315',
      allowedValues: ['Company Admin', 'Company Staff'] 
    }
    // Add more field configurations as needed - , delimited
  ];
  
  // Check if the current view has any restricted fields
  const currentViewRestrictions = restrictedFields.filter(config => config.viewId === view.key);
  
  if (currentViewRestrictions.length > 0) {
    // For each restricted field in this view
    currentViewRestrictions.forEach(restriction => {
      // When a user clicks to edit a cell of this field
      $(document).on('click', `.${restriction.fieldId}.cell-edit`, function() {
        // Wait for the dropdown to appear
        const checkDropdown = setInterval(function() {
          // Find the dropdown options once available
          const $options = $('.kn-select .chosen-drop .chosen-results li');
          
          if ($options.length > 0) {
            clearInterval(checkDropdown);
            
            // Hide options that are not in the allowed list
            $options.each(function() {
              const $option = $(this);
              const optionText = $option.text().trim();
              
              if (!restriction.allowedValues.includes(optionText)) {
                $option.hide(); // Hide the option in the dropdown
              }
            });
          }
        }, 100); // Check every 100ms
      });
    });
  }
});
// Remove Account Settings link and separator for specific user
$(document).on('knack-scene-render.any', function() {
    // Check if the logged-in user's Record ID matches the specified ID
    if (Knack.getUserAttributes().id === '5d48fe3e14de700010e0c25a') {
        // Use KTL's _cls keyword to remove the Account Settings link and separator
        ktl.views.addViewKeywords({
            ktlTarget: '#knack-dist_1 > div.kn-info-bar a[href="#account-settings"], #knack-dist_1 > div.kn-info-bar a[href="#account-settings"] + span:contains(" - ")',
            cls: 'ktlRemove'
        });
    }
});
}