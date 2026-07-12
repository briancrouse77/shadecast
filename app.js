document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. STATE & MOCK DATA
  // ==========================================

  // Weather presets configurations (Simulated defaults)
  const weatherPresets = {
    sunny: {
      uv: 8,
      rating: 'Very High',
      ratingColor: '#ef4444', // red
      solarOutput: '920 W/m²',
      glareLevel: 'High',
      glareColorClass: 'text-warning',
      temp: '87°F',
      condition: 'Clear Sky',
      recCategory: 'Category 3: Dark Tint',
      recTint: 'Dark Grey or Green to maintain natural color perception.',
      recPolarization: 'Essential. Intense reflections off asphalt and metallic surfaces.',
      recFinish: 'Silver Mirror Coating optional for extreme glare block.',
      glareIntensity: 0.7,
      tmzImg: 'assets/celebrity.jpg',
      tmzBadge: 'SPOTTED IN BEVERLY HILLS',
      tmzTitle: 'Hailey Bieber Rocks Oversized Acetate Shields',
      tmzDesc: 'Matching the extreme 95°F California heatwave with Category 3 blacked-out lenses.'
    },
    glare: {
      uv: 11,
      rating: 'Extreme',
      ratingColor: '#a855f7', // purple
      solarOutput: '1080 W/m²',
      glareLevel: 'Extreme',
      glareColorClass: 'text-danger',
      temp: '32°F',
      condition: 'Fresh Snow / Glacial Glare',
      recCategory: 'Category 4: Extreme Dark',
      recTint: 'Dark Brown or Charcoal (maximum blue light blockage).',
      recPolarization: 'Critical. White snow surfaces reflect up to 85% of solar radiation.',
      recFinish: 'Solid Mirrored Finish (Gold or Blue) highly recommended.',
      glareIntensity: 1.0,
      tmzImg: 'assets/celebrity_snow.jpg',
      tmzBadge: 'SPOTTED IN ASPEN',
      tmzTitle: 'Gwyneth Paltrow Leads the Ski-Goggle Style Pack',
      tmzDesc: 'Spotted on the slopes in neon-pink polarized mirrored shields to block heavy glacial reflection.'
    },
    sunset: {
      uv: 2,
      rating: 'Low',
      ratingColor: '#10b981', // green
      solarOutput: '180 W/m²',
      glareLevel: 'High (Low Angle)',
      glareColorClass: 'text-warning',
      temp: '74°F',
      condition: 'Golden Hour / Low Sun',
      recCategory: 'Category 1-2: Light/Medium Tint',
      recTint: 'Amber, Rose, or Bronze (improves contrast and depth in twilight).',
      recPolarization: 'Highly Recommended. Blinding road reflections due to low-angle rays.',
      recFinish: 'Gradient shading (darker at top, lighter at bottom) is ideal.',
      glareIntensity: 0.5,
      tmzImg: 'assets/celebrity_sunset.jpg',
      tmzBadge: 'SPOTTED IN MALIBU',
      tmzTitle: 'Jensen Ackles Caught in Retro Golden Tints',
      tmzDesc: 'Strolling the Malibu boardwalk in custom tortoiseshell amber aviators to soften low sunset glare.'
    },
    overcast: {
      uv: 3,
      rating: 'Moderate',
      ratingColor: '#eab308', // yellow
      solarOutput: '310 W/m²',
      glareLevel: 'Low (Diffuse)',
      glareColorClass: '',
      temp: '64°F',
      condition: 'Dense Clouds',
      recCategory: 'Category 1: Light Tint',
      recTint: 'Yellow, Rose, or Light Amber (flat-light contrast enhancement).',
      recPolarization: 'Optional. Specular glare is minimal in diffuse light.',
      recFinish: 'Anti-reflective backing coating to prevent bounce-back reflections.',
      glareIntensity: 0.15,
      tmzImg: 'assets/celebrity_cloudy.jpg',
      tmzBadge: 'SPOTTED IN LONDON',
      tmzTitle: 'Lily Collins Shines in Amber Wire Frames',
      tmzDesc: 'Brightening up a wet and cloudy London afternoon with light yellow-tinted transitional lenses.'
    }
  };

  // Night preset when local sun is down
  const nightPreset = {
    uv: 0,
    rating: 'Night / Low',
    ratingColor: '#64748b', // slate
    solarOutput: '0 W/m²',
    glareLevel: 'Low (Artificial)',
    glareColorClass: '',
    temp: '66°F',
    condition: 'Clear Night Sky',
    recCategory: 'Category 0: Clear / Light Tint',
    recTint: 'Clear, Yellow, or Rose (maintains visibility, reduces headlight glare).',
    recPolarization: 'Optional. Contrast filters are more effective at night than polarized.',
    recFinish: 'Anti-Reflective backing is highly recommended.',
    glareIntensity: 0.05,
    tmzImg: 'assets/celebrity_cloudy.jpg', // Reuse cloudy photo as stylish city night paparazzi
    tmzBadge: 'SPOTTED AT MIDNIGHT',
    tmzTitle: 'Rihanna Rocks Clear Glasses at Afterparty',
    tmzDesc: 'Styling a late night New York club appearance with clear yellow-tinted aviator glasses.'
  };

  // Lens Tints settings
  const lensTints = {
    grey: {
      color: 'rgba(43, 43, 43, 0.85)',
      description: 'Grey Lens: maintains true color perception and offers the best daily comfort.'
    },
    amber: {
      color: 'rgba(176, 92, 29, 0.82)',
      description: 'Amber/Brown Lens: sharpens contrast, blocks blue light, and improves depth perception. Perfect for driving.'
    },
    green: {
      color: 'rgba(23, 61, 42, 0.84)',
      description: 'Green Lens: minimizes color distortion and provides excellent contrast in both bright sun and shadow.'
    },
    blue: {
      color: 'rgba(11, 111, 184, 0.82)',
      description: 'Blue Mirrored Lens: filters harsh yellow light and looks ultra-sleek. Great for water activities.'
    },
    rose: {
      color: 'rgba(156, 39, 176, 0.78)',
      description: 'Rose/Red Lens: enhances detail and reduces eye strain. High performance in overcast settings.'
    }
  };

  // State Management
  let currentPreset = 'sunny';
  let currentTint = 'grey';
  let isPolarized = true;
  let darknessValue = 85;
  let isNightActive = false;
  let currentUvIntensity = 0.7; // default glare factor

  // Quiz state
  let currentQuizStep = 1;
  const quizAnswers = {
    activity: '',
    sensitivity: '',
    aesthetic: ''
  };

  // ==========================================
  // 2. DOM ELEMENTS
  // ==========================================

  // Preset Buttons
  const btnSunny = document.getElementById('btnPresetSunny');
  const btnGlare = document.getElementById('btnPresetGlare');
  const btnSunset = document.getElementById('btnPresetSunset');
  const btnOvercast = document.getElementById('btnPresetOvercast');
  const presetButtons = [btnSunny, btnGlare, btnSunset, btnOvercast];

  // Weather Widget Details
  const uvGaugeFill = document.getElementById('uvGaugeFill');
  const uvNumber = document.getElementById('uvNumber');
  const uvRatingText = document.getElementById('uvRatingText');
  const metricSolar = document.getElementById('metricSolar');
  const metricGlare = document.getElementById('metricGlare');
  const metricTemp = document.getElementById('metricTemp');
  const metricCondition = document.getElementById('metricCondition');

  // Lens Recommendation Details
  const recCategory = document.getElementById('recCategory');
  const recTint = document.getElementById('recTint');
  const recPolarization = document.getElementById('recPolarization');
  const recFinish = document.getElementById('recFinish');

  // Simulator Elements
  const simContainer = document.getElementById('simContainer');
  const sunglassesPane = document.getElementById('sunglassesPane');
  const sliderHandle = document.getElementById('sliderHandle');
  const glareOverlay = document.getElementById('glareOverlay');
  const tintOverlay = document.getElementById('tintOverlay');
  const polarizedOverlay = document.getElementById('polarizedOverlay');
  const simVibeBadge = document.getElementById('simVibeBadge');

  // Simulator Control inputs
  const btnTintGrey = document.getElementById('btnTintGrey');
  const btnTintAmber = document.getElementById('btnTintAmber');
  const btnTintGreen = document.getElementById('btnTintGreen');
  const btnTintBlue = document.getElementById('btnTintBlue');
  const btnTintRose = document.getElementById('btnTintRose');
  const tintDots = [btnTintGrey, btnTintAmber, btnTintGreen, btnTintBlue, btnTintRose];
  const tintDesc = document.getElementById('tintDesc');

  const darknessSlider = document.getElementById('darknessSlider');
  const darknessVal = document.getElementById('darknessVal');
  const polarizationToggle = document.getElementById('polarizationToggle');

  // Tabs Elements
  const tabBtnTmz = document.getElementById('tabBtnTmz');
  const tabBtnQuiz = document.getElementById('tabBtnQuiz');
  const tabTmz = document.getElementById('tabTmz');
  const tabQuiz = document.getElementById('tabQuiz');

  // TMZ Hero elements
  const tmzHeroImg = document.getElementById('tmzHeroImg');
  const tmzHeroBadge = document.getElementById('tmzHeroBadge');
  const tmzHeroTitle = document.getElementById('tmzHeroTitle');
  const tmzHeroDesc = document.getElementById('tmzHeroDesc');

  // Quiz Elements
  const quizStep1 = document.getElementById('quizStep1');
  const quizStep2 = document.getElementById('quizStep2');
  const quizStep3 = document.getElementById('quizStep3');
  const quizStepResult = document.getElementById('quizStepResult');
  const quizSteps = [quizStep1, quizStep2, quizStep3, quizStepResult];

  const quizProgress = document.getElementById('quizProgress');
  const quizStepText = document.getElementById('quizStepText');
  const quizFooter = document.getElementById('quizFooter');
  
  const resultName = document.getElementById('resultName');
  const resultDesc = document.getElementById('resultDesc');

  // Telemetry state tracker
  const analytics = {
    apiCalls: 0,
    geoPings: 0,
    lensClicks: { grey: 0, amber: 0, green: 0, blue: 0, rose: 0 },
    applyIntent: 0,
    tmzClicks: 0,
    searchedCities: []
  };
  const resultTint = document.getElementById('resultTint');
  const resultPolar = document.getElementById('resultPolar');
  const btnRestartQuiz = document.getElementById('btnRestartQuiz');

  // ==========================================
  // 3. EVENT LISTENERS & LOGIC
  // ==========================================

  // Tab Switching
  function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTabId = btn.getAttribute('data-tab');
        
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPane = document.getElementById(targetTabId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }

  // Restricted Admin Telemetry Gate Authentication logic
  function setupAdminAuth() {
    const adminAuthCard = document.getElementById('adminAuthCard');
    const adminDashboardCard = document.getElementById('adminDashboardCard');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const btnAdminAuthenticate = document.getElementById('btnAdminAuthenticate');
    const authErrorMsg = document.getElementById('authErrorMsg');
    const btnLockAdmin = document.getElementById('btnLockAdmin');

    function checkAdminSession() {
      const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
      if (isAuthenticated) {
        if (adminAuthCard) adminAuthCard.style.display = 'none';
        if (adminDashboardCard) adminDashboardCard.style.display = 'block';
      } else {
        if (adminAuthCard) adminAuthCard.style.display = 'flex';
        if (adminDashboardCard) adminDashboardCard.style.display = 'none';
      }
    }

    // Check state on startup
    checkAdminSession();

    function performUnlock() {
      if (!adminPasswordInput || !authErrorMsg) return;
      const enteredPass = adminPasswordInput.value.trim();
      
      // Passkey is set to 'shadecast'
      if (enteredPass === 'shadecast') {
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        authErrorMsg.textContent = '';
        adminPasswordInput.value = '';
        checkAdminSession();
        logAdminEvent('sys', 'ADMIN CONSOLE SECURITY ACCESS AUTHORIZED');
      } else {
        authErrorMsg.textContent = 'ACCESS DENIED - INVALID PASSKEY';
        logAdminEvent('sys', 'SECURITY WARNING: UNAUTHORIZED ACCESS ATTEMPT DETECTED');
        adminPasswordInput.value = '';
        adminPasswordInput.focus();
      }
    }

    if (btnAdminAuthenticate && adminPasswordInput) {
      btnAdminAuthenticate.addEventListener('click', () => {
        performUnlock();
      });
      
      adminPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          performUnlock();
        }
      });
    }

    if (btnLockAdmin) {
      btnLockAdmin.addEventListener('click', () => {
        sessionStorage.removeItem('isAdminAuthenticated');
        checkAdminSession();
        logAdminEvent('sys', 'ADMIN CONSOLE SECURELY LOCKED');
      });
    }
  }

  // Draggable Simulator Split View
  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = simContainer.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    let percentage = (offsetX / rect.width) * 100;
    
    // Constraints
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    // Apply styles
    sliderHandle.style.left = `${percentage}%`;
    sunglassesPane.style.width = `${percentage}%`;
  }

  function setupSlider() {
    // Mouse Events
    simContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch Events for Mobile
    simContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) {
        updateSliderPosition(e.touches[0].clientX);
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        updateSliderPosition(e.touches[0].clientX);
      }
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // Update Weather UI (Simulated Preset Mode)
  function updateWeatherUI(presetName, hour = 12) {
    const isNight = hour < 6 || hour >= 20;
    isNightActive = isNight;
    const preset = isNight ? nightPreset : weatherPresets[presetName];
    if (!preset) return;

    applyWeatherPresetToUI(preset, presetName, isNight);
  }

  function updateGlareOverlay() {
    const activePreset = isNightActive ? nightPreset : weatherPresets[currentPreset];
    const baseFactor = activePreset ? activePreset.glareIntensity : currentUvIntensity;
    
    if (isPolarized) {
      glareOverlay.style.opacity = (baseFactor * 0.15).toFixed(2);
    } else {
      glareOverlay.style.opacity = baseFactor.toFixed(2);
    }
  }

  // Setup Weather Toggles
  function setupWeatherPresets() {
    presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        presetButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentPreset = btn.getAttribute('data-preset');
        isNightActive = false; // simulated preset assumes daytime
        
        const displayLabel = btn.innerText.replace(/[^\w\s/]/g, '').trim();
        updateLocationStatus(`Simulated: ${displayLabel}`, false);
        
        updateWeatherUI(currentPreset, 12);
      });
    });
  }

  // ==========================================
  // DYNAMIC GEOLOCATION & REAL WEATHER FETCH
  // ==========================================
  
  // Geolocation trigger
  function initGeolocation() {
    const btnGeolocate = document.getElementById('btnGeolocate');
    const btnCitySearch = document.getElementById('btnCitySearch');
    const citySearchInput = document.getElementById('citySearchInput');
    const locationControlWrapper = document.getElementById('locationControlWrapper');
    const btnChangeLocation = document.getElementById('btnChangeLocation');

    if (btnGeolocate) {
      btnGeolocate.addEventListener('click', () => {
        triggerGeolocation();
      });
    }

    if (btnChangeLocation && locationControlWrapper) {
      btnChangeLocation.addEventListener('click', () => {
        locationControlWrapper.classList.remove('has-location');
        if (citySearchInput) {
          citySearchInput.value = '';
          citySearchInput.focus();
        }
        updateLocationStatus('Enter Location...', false);
      });
    }

    if (btnCitySearch && citySearchInput) {
      btnCitySearch.addEventListener('click', () => {
        const query = citySearchInput.value.trim();
        if (query) {
          searchCityLocation(query);
        }
      });

      citySearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = citySearchInput.value.trim();
          if (query) {
            searchCityLocation(query);
          }
        }
      });
    }

    const btnResetToLive = document.getElementById('btnResetToLive');
    if (btnResetToLive) {
      btnResetToLive.addEventListener('click', () => {
        triggerGeolocation();
      });
    }

    // Try auto-detecting on startup. "If we can figure it out set it, if not let them."
    triggerGeolocation(true);
  }

  function updateLocationStatus(text, isGps = false) {
    const statusText = document.getElementById('locationStatusText');
    const indicatorDot = document.getElementById('locIndicatorDot');
    const brandSubtitle = document.getElementById('brandSubtitle');
    const tailoredBadge = document.getElementById('tailoredBadge');
    const btnResetToLive = document.getElementById('btnResetToLive');

    if (statusText) statusText.textContent = text;
    
    if (indicatorDot) {
      if (isGps) {
        indicatorDot.classList.add('live-gps');
      } else {
        indicatorDot.classList.remove('live-gps');
      }
    }

    const isSystemStatus = text.includes('Locating') || text.includes('Detecting') || text.includes('Loading') || text.includes('Denied') || text.includes('error') || text.includes('Offline') || text.includes('Search');
    const isSimulated = text.includes('Simulated:');

    // Toggle Sync Live button visibility
    if (btnResetToLive) {
      btnResetToLive.style.display = isSimulated ? 'inline-flex' : 'none';
    }

    // Dynamic branding and tailored dashboard badge updates
    if (brandSubtitle && tailoredBadge) {
      if (isSystemStatus) {
        brandSubtitle.textContent = 'Sunglasses UV Advisor Built for Your Location';
        tailoredBadge.style.display = 'none';
      } else if (isSimulated) {
        const label = text.replace('Simulated:', '').trim();
        brandSubtitle.textContent = `Sunglasses Advisor: Simulated ${label}`;
        tailoredBadge.textContent = `📍 Simulated: ${label}`;
        tailoredBadge.style.display = 'inline-flex';
      } else {
        brandSubtitle.textContent = `Sunglasses Advisor Built for ${text}`;
        tailoredBadge.textContent = `📍 Tailored for ${text}`;
        tailoredBadge.style.display = 'inline-flex';
      }
    }
  }

  // Geolocation API call (tries IP lookup first, then falls back to browser GPS)
  function triggerGeolocation(isStartup = false) {
    updateLocationStatus('Locating...', true);
    logAdminEvent('geo', 'Initiated geolocation lookup query...');

    // 1. Try IP Geolocation first (fully automatic, no permission popups, supports localhost)
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.latitude && data.longitude) {
          const city = data.city || 'Detected City';
          const region = data.region_code || '';
          const displayName = region ? `${city}, ${region}` : city;
          
          logAdminEvent('geo', `Resolved IP city: ${displayName} [Lat: ${data.latitude.toFixed(2)}, Lon: ${data.longitude.toFixed(2)}]`);
          fetchWeatherForCoordinates(data.latitude, data.longitude, displayName, true);
        } else {
          logAdminEvent('geo', 'IP lookup empty. Falling back to Browser GPS...');
          triggerBrowserGps(isStartup);
        }
      })
      .catch(err => {
        console.warn('Primary IP lookup failed, trying backup API:', err);
        // Backup IP Geolocation API
        fetch('https://freeipapi.com/api/json')
          .then(res => res.json())
          .then(data => {
            if (data && data.latitude && data.longitude) {
              const city = data.cityName || 'Detected City';
              const region = data.regionCode || '';
              const displayName = region ? `${city}, ${region}` : city;
              
              fetchWeatherForCoordinates(data.latitude, data.longitude, displayName, true);
            } else {
              triggerBrowserGps(isStartup);
            }
          })
          .catch(() => {
            triggerBrowserGps(isStartup);
          });
      });
  }

  function triggerBrowserGps(isStartup) {
    if (!navigator.geolocation) {
      updateLocationStatus('GPS unsupported', false);
      if (isStartup) loadFallbackLocation();
      return;
    }

    const options = { timeout: 6000, maximumAge: 600000 };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
          .then(res => res.json())
          .then(data => {
            const cityName = data.city || data.locality || 'Detected Location';
            const countryCode = data.countryCode || '';
            const displayName = countryCode ? `${cityName}, ${countryCode}` : cityName;
            
            fetchWeatherForCoordinates(lat, lon, displayName, true);
          })
          .catch(() => {
            fetchWeatherForCoordinates(lat, lon, `GPS: ${lat.toFixed(2)}, ${lon.toFixed(2)}`, true);
          });
      },
      (error) => {
        console.warn('Browser GPS failed:', error.message);
        if (isStartup) {
          loadFallbackLocation();
        } else {
          updateLocationStatus('GPS Access Denied', false);
        }
      },
      options
    );
  }

  // Geocoding query for text input
  function searchCityLocation(cityName) {
    updateLocationStatus(`Searching '${cityName}'...`, false);
    
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          const displayName = result.country ? `${result.name}, ${result.country}` : result.name;
          fetchWeatherForCoordinates(result.latitude, result.longitude, displayName, false);
        } else {
          updateLocationStatus('City not found', false);
        }
      })
      .catch(err => {
        console.error(err);
        updateLocationStatus('Search error', false);
      });
  }

  // Load fallback weather for Miami
  function loadFallbackLocation() {
    fetchWeatherForCoordinates(25.7617, -80.1918, 'Miami, USA (Default)', false);
  }

  // Real weather fetch using Open-Meteo API
  function fetchWeatherForCoordinates(lat, lon, locationName, isGps = false) {
    analytics.apiCalls++;
    analytics.geoPings++;
    updateTelemetryUI();

    updateLocationStatus('Loading weather...', isGps);
    logAdminEvent('api', `Fetch current satellite weather for coordinates [${lat.toFixed(2)}, ${lon.toFixed(2)}]`);
    
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,uv_index,is_day&temperature_unit=fahrenheit&wind_speed_unit=mph`;
    
    fetch(weatherUrl)
      .then(res => res.json())
      .then(data => {
        if (data.current) {
          const temp = Math.round(data.current.temperature_2m);
          const rawUv = data.current.uv_index || 0;
          const uvVal = Math.round(rawUv);
          logAdminEvent('api', `Loaded climate data: ${temp}°F | UV Index: ${uvVal}`);
          const isDay = data.current.is_day === 1;
          const code = data.current.weather_code;

          // Determine UV Rating text and color
          let rating = 'Low';
          let ratingColor = '#10b981';
          if (uvVal >= 11) {
            rating = 'Extreme';
            ratingColor = '#a855f7';
          } else if (uvVal >= 8) {
            rating = 'Very High';
            ratingColor = '#ef4444';
          } else if (uvVal >= 6) {
            rating = 'High';
            ratingColor = '#f97316';
          } else if (uvVal >= 3) {
            rating = 'Moderate';
            ratingColor = '#eab308';
          }

          // Map WMO Code to weather preset category
          let conditionName = 'Clear';
          let tempPreset = 'sunny';
          
          if ([71, 73, 75, 77, 85, 86].includes(code)) {
            conditionName = 'Snow Glare';
            tempPreset = 'glare';
          } else if ([3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) {
            conditionName = 'Overcast / Rain';
            tempPreset = 'overcast';
          } else if (uvVal < 3) {
            conditionName = 'Clear / Low Sun';
            tempPreset = 'sunset';
          }

          // Create dynamic preset object
          const dynamicPreset = {
            uv: uvVal,
            rating: rating,
            ratingColor: ratingColor,
            solarOutput: `${Math.round(rawUv * 115)} W/m²`,
            glareLevel: uvVal >= 8 ? 'High' : (uvVal >= 5 ? 'Moderate' : 'Low'),
            temp: `${temp}°F`,
            condition: isDay ? conditionName : 'Night Sky',
            glareIntensity: isDay ? (uvVal >= 8 ? 0.7 : (uvVal >= 5 ? 0.45 : 0.2)) : 0.05
          };

          // Generate dynamic lens recommendations
          if (uvVal >= 11) {
            dynamicPreset.recCategory = 'Category 4: Extreme Dark';
            dynamicPreset.recTint = 'Charcoal or dark brown blocks maximum solar transmission.';
            dynamicPreset.recPolarization = 'Critical. Intense glare reflection risk.';
            dynamicPreset.recFinish = 'Mirrored shield finish is highly recommended.';
          } else if (uvVal >= 8) {
            dynamicPreset.recCategory = 'Category 3: Dark Tint';
            dynamicPreset.recTint = 'Dark grey or green preserves natural visual colors.';
            dynamicPreset.recPolarization = 'Essential. High glare reflection expected.';
            dynamicPreset.recFinish = 'Mirror coating optional for visual relief.';
          } else if (uvVal >= 3) {
            dynamicPreset.recCategory = 'Category 2: Medium Tint';
            dynamicPreset.recTint = 'Amber or classic green enhances depth and contrast.';
            dynamicPreset.recPolarization = 'Recommended for driving or outdoor activities.';
            dynamicPreset.recFinish = 'Standard anti-scratch finish recommended.';
          } else if (uvVal > 0) {
            dynamicPreset.recCategory = 'Category 1: Light Tint';
            dynamicPreset.recTint = 'Yellow or rose enhances details in overcast or flat light.';
            dynamicPreset.recPolarization = 'Optional. Contrast detail is the priority.';
            dynamicPreset.recFinish = 'Anti-reflective backings work best.';
          } else {
            dynamicPreset.recCategory = 'Category 0: Clear Lens';
            dynamicPreset.recTint = 'Clear or light yellow night-driving lens increases light.';
            dynamicPreset.recPolarization = 'Optional. Anti-reflective is key at night.';
            dynamicPreset.recFinish = 'Anti-reflective backing essential.';
          }

          // Map paparazzi TMZ gossip cards dynamically
          const shortCity = locationName.split(',')[0].trim().replace(/\(Default\)/gi, '').trim();
          const isNight = !isDay;
          if (isNight) {
            dynamicPreset.tmzImg = 'assets/celebrity_cloudy.jpg';
            dynamicPreset.tmzBadge = 'SPOTTED AT MIDNIGHT';
            dynamicPreset.tmzTitle = 'Rihanna Rocks Clear Aviator Tints';
            dynamicPreset.tmzDesc = `Seen wearing light Category 0 clear frames at a midnight afterparty, matching the night-time conditions in ${shortCity}.`;
          } else if (tempPreset === 'glare') {
            dynamicPreset.tmzImg = 'assets/celebrity_snow.jpg';
            dynamicPreset.tmzBadge = 'SPOTTED IN ASPEN';
            dynamicPreset.tmzTitle = 'Gwyneth Paltrow in Mirrored Shields';
            dynamicPreset.tmzDesc = `Seen hitting the slopes in Aspen in polarized ski goggles, matching the extreme glare conditions in ${shortCity}.`;
          } else if (tempPreset === 'sunset') {
            dynamicPreset.tmzImg = 'assets/celebrity_sunset.jpg';
            dynamicPreset.tmzBadge = 'SPOTTED IN MALIBU';
            dynamicPreset.tmzTitle = 'Jensen Ackles in Retro Amber Aviators';
            dynamicPreset.tmzDesc = `Spotted walking the Malibu pier in custom tortoiseshell amber aviators, matching the low golden sunset angle in ${shortCity}.`;
          } else if (tempPreset === 'overcast') {
            dynamicPreset.tmzImg = 'assets/celebrity_cloudy.jpg';
            dynamicPreset.tmzBadge = 'SPOTTED IN LONDON';
            dynamicPreset.tmzTitle = 'Lily Collins in Transitional Tints';
            dynamicPreset.tmzDesc = `Seen strolling London streets in overcast weather, matching the flat light cloud cover in ${shortCity}.`;
          } else {
            dynamicPreset.tmzImg = 'assets/celebrity.jpg';
            dynamicPreset.tmzBadge = 'SPOTTED IN BEVERLY HILLS';
            dynamicPreset.tmzTitle = 'Hailey Bieber Rocks Matte Acetate Shields';
            dynamicPreset.tmzDesc = `Matching the sunny, ${temp}°F UV conditions in ${shortCity} with blacked-out wrap-around shields.`;
          }

          // Log geocoded city to regional demand ledger
          const cityLabel = shortCity || 'Detected City';
          const matchedTintDesc = dynamicPreset.recCategory.split(':')[0].trim();
          const cityEntry = {
            city: `${cityLabel} (${tempPreset.toUpperCase()})`,
            specs: `${temp}°F | ${matchedTintDesc}`
          };
          if (!analytics.searchedCities.some(entry => entry.city === cityEntry.city)) {
            analytics.searchedCities.unshift(cityEntry);
          }
          updateTelemetryUI();

          // Update UI
          isNightActive = isNight;
          currentUvIntensity = dynamicPreset.glareIntensity;
          applyWeatherPresetToUI(dynamicPreset, tempPreset, isNight);
          updateLocationStatus(locationName, isGps);

          // Reveal resolved location, hide manual search input
          const locationControlWrapper = document.getElementById('locationControlWrapper');
          if (locationControlWrapper) {
            locationControlWrapper.classList.add('has-location');
          }
        }
      })
      .catch(err => {
        console.error('Weather fetch error:', err);
        updateLocationStatus('Offline - Using Presets', false);
        // On error, just maintain the current preset state (Miami Sunny) so the UI doesn't break
        updateWeatherUI(currentPreset, 12);
      });
  }

  function applyWeatherPresetToUI(preset, presetName, isNight = false) {
    logAdminEvent('sys', `Applying climate preset variables: ${presetName.toUpperCase()}`);
    // Gauge calculation
    const uvMax = 12;
    const uvVal = Math.min(preset.uv, uvMax);
    const dashOffset = 251.2 * (1 - uvVal / uvMax);

    // Apply values
    uvGaugeFill.style.strokeDashoffset = dashOffset;
    uvGaugeFill.style.stroke = preset.ratingColor;
    uvNumber.textContent = preset.uv;
    uvRatingText.textContent = preset.rating;
    uvRatingText.style.color = preset.ratingColor;

    metricSolar.textContent = preset.solarOutput;
    metricGlare.textContent = preset.glareLevel;
    
    // Toggle warning colors on glare status
    if (isNight) {
      metricGlare.className = 'metric-val';
    } else if (presetName === 'glare' || presetName === 'sunset') {
      metricGlare.className = 'metric-val text-warning';
    } else {
      metricGlare.className = 'metric-val';
    }

    metricTemp.textContent = preset.temp;
    metricCondition.textContent = preset.condition;

    // Recommendation Card
    recCategory.textContent = preset.recCategory;
    recCategory.style.borderLeftColor = preset.ratingColor;
    recTint.textContent = preset.recTint;
    recPolarization.textContent = preset.recPolarization;
    recFinish.textContent = preset.recFinish;

    // Update TMZ Hero dynamically
    if (tmzHeroImg && preset.tmzImg) {
      tmzHeroImg.src = preset.tmzImg;
    }
    if (tmzHeroBadge && preset.tmzBadge) {
      tmzHeroBadge.textContent = preset.tmzBadge;
    }
    if (tmzHeroTitle && preset.tmzTitle) {
      tmzHeroTitle.textContent = preset.tmzTitle;
    }
    if (tmzHeroDesc && preset.tmzDesc) {
      tmzHeroDesc.textContent = preset.tmzDesc;
    }

    // Apply night simulator visual filters
    const baseImg = document.getElementById('simImageBase');
    const filteredImg = document.getElementById('simImageFilter');
    if (baseImg && filteredImg) {
      if (isNight) {
        baseImg.style.filter = 'brightness(0.2) contrast(1.1)';
        filteredImg.style.filter = 'brightness(0.3) contrast(1.05)';
        
        // Show artificial headlight glare on unpolarized night side
        if (!isPolarized) {
          polarizedOverlay.style.background = 'radial-gradient(circle 80px at 50% 50%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 30%, transparent 60%)';
          polarizedOverlay.style.mixBlendMode = 'screen';
        } else {
          polarizedOverlay.style.background = 'none';
        }
      } else {
        baseImg.style.filter = 'none';
        filteredImg.style.filter = 'contrast(1.1)';
      }
    }

    // Glare Overlay adjustments
    const baseFactor = preset.glareIntensity;
    if (isPolarized) {
      glareOverlay.style.opacity = (baseFactor * 0.15).toFixed(2);
    } else {
      glareOverlay.style.opacity = baseFactor.toFixed(2);
    }
  }

  // Tint Simulation
  function applyTint(tintName) {
    const tint = lensTints[tintName];
    if (!tint) return;

    if (analytics.lensClicks[tintName] !== undefined) {
      analytics.lensClicks[tintName]++;
      updateTelemetryUI();
      logAdminEvent('lens', `Simulated lens tint: ${tintName.toUpperCase()}`);
    }

    currentTint = tintName;
    tintDesc.textContent = tint.description;
    
    // Apply background color of tint overlay
    const rawRgbaParts = tint.color.match(/[\d.]+/g);
    if (rawRgbaParts && rawRgbaParts.length >= 3) {
      const alpha = (darknessValue / 100).toFixed(2);
      tintOverlay.style.backgroundColor = `rgba(${rawRgbaParts[0]}, ${rawRgbaParts[1]}, ${rawRgbaParts[2]}, ${alpha})`;
    }
  }

  function setupTintControls() {
    tintDots.forEach(dot => {
      dot.addEventListener('click', () => {
        tintDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        
        const tint = dot.getAttribute('data-tint');
        applyTint(tint);
      });
    });

    // Darkness slider
    darknessSlider.addEventListener('input', (e) => {
      darknessValue = e.target.value;
      darknessVal.textContent = `${darknessValue}%`;
      applyTint(currentTint);
    });

    // Polarization toggle
    polarizationToggle.addEventListener('change', (e) => {
      isPolarized = e.target.checked;
      updatePolarizationSimulator();
      logAdminEvent('lens', `Polarized Filter toggled: ${isPolarized ? 'ACTIVE' : 'INACTIVE'}`);
    });
  }

  function updatePolarizationSimulator() {
    if (isPolarized) {
      // Standard polarized lens block
      polarizedOverlay.style.background = 'radial-gradient(circle 350px at 53% 20%, rgba(255,255,255,0) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.25) 75%)';
      polarizedOverlay.style.mixBlendMode = 'multiply';
      
      simVibeBadge.textContent = 'Polarized Active';
      simVibeBadge.style.color = 'var(--accent-purple)';
      simVibeBadge.style.borderColor = 'rgba(168, 85, 247, 0.2)';
      simVibeBadge.style.background = 'rgba(168, 85, 247, 0.1)';
    } else {
      // Glare leaks through completely even through lens
      polarizedOverlay.style.background = 'radial-gradient(circle 350px at 53% 20%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 45%, transparent 70%)';
      polarizedOverlay.style.mixBlendMode = 'overlay';

      simVibeBadge.textContent = 'Polarization Disabled';
      simVibeBadge.style.color = 'var(--text-secondary)';
      simVibeBadge.style.borderColor = 'var(--card-border)';
      simVibeBadge.style.background = 'rgba(255,255,255,0.03)';
    }
    
    updateGlareOverlay();
  }

  // ==========================================
  // 4. DIAGNOSTIC QUIZ SYSTEM
  // ==========================================

  function updateQuizStepUI() {
    quizSteps.forEach(step => step.classList.remove('active'));
    
    if (currentQuizStep === 'result') {
      quizStepResult.classList.add('active');
      quizFooter.style.display = 'none';
      calculateQuizResult();
    } else {
      const activeStep = document.getElementById(`quizStep${currentQuizStep}`);
      if (activeStep) {
        activeStep.classList.add('active');
      }
      quizFooter.style.display = 'flex';
      
      const progressPercent = (currentQuizStep / 3) * 100;
      quizProgress.style.width = `${progressPercent}%`;
      quizStepText.textContent = `Question ${currentQuizStep} of 3`;
    }
  }

  function setupQuiz() {
    const optionButtons = document.querySelectorAll('.quiz-opt');
    optionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const optionVal = btn.getAttribute('data-ans');
        
        if (currentQuizStep === 1) {
          quizAnswers.activity = optionVal;
          logAdminEvent('quiz', `User answered Q1: Activity = ${optionVal.toUpperCase()}`);
          currentQuizStep = 2;
        } else if (currentQuizStep === 2) {
          quizAnswers.sensitivity = optionVal;
          logAdminEvent('quiz', `User answered Q2: Sensitivity = ${optionVal.toUpperCase()}`);
          currentQuizStep = 3;
        } else if (currentQuizStep === 3) {
          quizAnswers.aesthetic = optionVal;
          logAdminEvent('quiz', `User answered Q3: Vibe = ${optionVal.toUpperCase()}`);
          currentQuizStep = 'result';
        }
        
        updateQuizStepUI();
      });
    });

    btnRestartQuiz.addEventListener('click', () => {
      currentQuizStep = 1;
      quizAnswers.activity = '';
      quizAnswers.sensitivity = '';
      quizAnswers.aesthetic = '';
      updateQuizStepUI();
      logAdminEvent('quiz', 'Diagnostic evaluation restarted by user');
    });

    // Apply Diagnostic Prescription result back to Simulator view
    const btnApplyQuizResult = document.getElementById('btnApplyQuizResult');
    if (btnApplyQuizResult) {
      btnApplyQuizResult.addEventListener('click', () => {
        analytics.applyIntent++;
        updateTelemetryUI();

        const resolvedTintStr = (resultTint.textContent || '').toLowerCase();
        let tintKey = 'grey';
        
        if (resolvedTintStr.includes('amber')) tintKey = 'amber';
        else if (resolvedTintStr.includes('green')) tintKey = 'green';
        else if (resolvedTintStr.includes('blue')) tintKey = 'blue';
        else if (resolvedTintStr.includes('rose')) tintKey = 'rose';

        // Select the active color dot
        const targetDot = document.querySelector(`.tint-dot[data-tint="${tintKey}"]`);
        if (targetDot) {
          targetDot.click();
        }

        // Set polarization
        const resolvedPolarStr = (resultPolar.textContent || '').toLowerCase();
        const polarizationToggle = document.getElementById('polarizationToggle');
        if (polarizationToggle) {
          const needsPolar = resolvedPolarStr.includes('yes') || resolvedPolarStr.includes('required') || resolvedPolarStr.includes('recommend');
          polarizationToggle.checked = needsPolar;
          polarizationToggle.dispatchEvent(new Event('change'));
        }

        // Set darkness value
        const darknessSlider = document.getElementById('darknessSlider');
        if (darknessSlider) {
          let recDark = 80;
          if (quizAnswers.sensitivity === 'high') recDark = 90;
          else if (quizAnswers.sensitivity === 'low') recDark = 65;
          darknessSlider.value = recDark;
          darknessSlider.dispatchEvent(new Event('input'));
        }

        // Switch active tab back to main Simulator view
        const tabBtnTmz = document.getElementById('tabBtnTmz');
        if (tabBtnTmz) {
          tabBtnTmz.click();
        }

        // Smooth scroll to simulator
        const simContainer = document.getElementById('simContainer');
        if (simContainer) {
          simContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  }

  function calculateQuizResult() {
    let name = 'The Classic Wayfarer';
    let desc = 'Timeless slate frames featuring balanced grey lenses for comfort, style, and natural true-color vision.';
    let tint = 'Grey Tints';
    let polar = 'Recommended';
    let category = 'Category 2: Medium Tint';
    let material = 'CR-39 Premium Polymer';
    let coatings = 'Anti-Reflective Backing, Scratch Shield';

    const act = quizAnswers.activity;
    const sens = quizAnswers.sensitivity;
    const aes = quizAnswers.aesthetic;

    // 1. Calculate main attributes
    if (act === 'beach' || act === 'sports') {
      polar = 'Yes (Required)';
      category = sens === 'high' ? 'Category 4: Glacier Dark' : 'Category 3: Dark Tint';
      material = act === 'sports' ? 'Polycarbonate (Shatterproof)' : 'Mineral Glass (Marine Grade)';
      coatings = act === 'sports' ? 'Hydrophobic & Anti-Fog' : 'Double-Mirror & Saltwater Resistant';
      
      if (aes === 'bold') {
        name = 'The Ocean Navigator';
        desc = 'Futuristic high-wrap frames paired with double-gradient blue mirrored polarized lenses to combat heavy ocean glare.';
        tint = 'Blue Mirrored Tints';
      } else if (aes === 'minimal') {
        name = 'The Sierra Trailblazer';
        desc = 'Ultra-lightweight titanium frames with contrast-enhancing green polarized lenses. Fits sporty mountain vibes.';
        tint = 'Green Tints';
      } else {
        name = 'The Mariner Classic';
        desc = 'Ergonomic tortoiseshell frames with deep amber polarized lenses for fishing, boating, and beach environments.';
        tint = 'Amber Tints';
      }
    } else if (act === 'driving') {
      polar = 'Yes (Required)';
      category = 'Category 3: Dark Tint';
      material = 'Polycarbonate (Impact Shield)';
      coatings = 'Anti-Reflective Backing, Polarization Filter';
      
      if (sens === 'high') {
        name = 'The Autobahn Pilot';
        desc = 'Bold aviator frames styled with high-density polarized amber lenses designed to filter hazardous dashboard reflections.';
        tint = 'Amber Tints';
      } else {
        name = 'The Commuter Pilot';
        desc = 'Slim metal frames with premium polarized grey lenses offering optimal fatigue relief during daily travel.';
        tint = 'Grey Tints';
      }
    } else {
      polar = sens === 'high' ? 'Recommended' : 'Optional';
      category = sens === 'high' ? 'Category 3: Dark Tint' : (sens === 'moderate' ? 'Category 2: Medium Tint' : 'Category 1: Light Tint');
      material = 'CR-39 Optical Polymer';
      coatings = 'Gradient Tint, Anti-Reflective Backing';
      
      if (aes === 'bold') {
        name = 'The Beverly Runway';
        desc = 'Flat-top black acetate shields with category-3 solid grey lenses. Uncompromising paparazzi-shield style.';
        tint = 'Solid Grey Tints';
      } else if (aes === 'minimal') {
        name = 'The Soho Aviator';
        desc = 'Sleek geometric gold wireframes with rose gradient lenses. Maximizes urban aesthetics and twilight detail.';
        tint = 'Rose/Pink Tints';
      } else {
        name = 'The Vintage Boulevard';
        desc = 'Classic circular retro frames with light green lenses, perfect for styling in sidewalk cafes.';
        tint = 'Green Tints';
      }
    }

    // 2. Set DOM elements
    const resultCategory = document.getElementById('resultCategory');
    const resultMaterial = document.getElementById('resultMaterial');
    const resultCoatings = document.getElementById('resultCoatings');
    const resultTimestamp = document.getElementById('resultTimestamp');

    resultName.textContent = name;
    resultDesc.textContent = desc;
    resultTint.textContent = tint;
    resultPolar.textContent = polar;
    
    if (resultCategory) resultCategory.textContent = category;
    if (resultMaterial) resultMaterial.textContent = material;
    if (resultCoatings) resultCoatings.textContent = coatings;
    if (resultTimestamp) {
      const now = new Date();
      resultTimestamp.textContent = `DATE: ${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
    }
    logAdminEvent('quiz', `Prescription compiled: ${name} (Matched: ${tint})`);
  }

  // Update Commercial Telemetry Admin panel in real-time
  function updateTelemetryUI() {
    const adminLeadValue = document.getElementById('adminLeadValue');
    const adminApiCost = document.getElementById('adminApiCost');
    const regionalLedger = document.getElementById('regionalLedger');

    // 1. Financial calculation:
    // $2.50 per high-intent prescription simulator apply click
    // $0.50 per live TMZ outbound link referral click
    // $0.15 per active simulator lens custom comparison click
    const lensCompareCount = Object.values(analytics.lensClicks).reduce((a, b) => a + b, 0);
    const estRevenue = (analytics.applyIntent * 2.50) + (analytics.tmzClicks * 0.50) + (lensCompareCount * 0.15);
    const apiCost = analytics.apiCalls * 0.0025; // Open-Meteo API rates estimated

    if (adminLeadValue) adminLeadValue.textContent = `$${estRevenue.toFixed(2)}`;
    if (adminApiCost) adminApiCost.textContent = `$${apiCost.toFixed(4)}`;

    // 2. Update Lens Demand progress bars:
    const totalLensClicks = lensCompareCount || 1;
    const tints = ['grey', 'amber', 'green', 'blue', 'rose'];
    tints.forEach(tint => {
      const tintKeyCapitalized = tint.charAt(0).toUpperCase() + tint.slice(1);
      const barFill = document.getElementById(`bar${tintKeyCapitalized}`);
      const countLabel = document.getElementById(`count${tintKeyCapitalized}`);

      if (barFill && countLabel) {
        const count = analytics.lensClicks[tint] || 0;
        const pct = Math.max(5, Math.round((count / totalLensClicks) * 100));
        barFill.style.width = `${pct}%`;
        countLabel.textContent = count;
      }
    });

    // 3. Update Regional Demand log:
    if (regionalLedger) {
      if (analytics.searchedCities.length === 0) {
        regionalLedger.innerHTML = '<div class="ledger-empty">Waiting for active GPS or search geocodes...</div>';
      } else {
        regionalLedger.innerHTML = '';
        analytics.searchedCities.forEach(entry => {
          const row = document.createElement('div');
          row.className = 'ledger-row';
          row.innerHTML = `
            <span class="ledger-city">📍 ${entry.city}</span>
            <span class="ledger-spec">${entry.specs}</span>
          `;
          regionalLedger.appendChild(row);
        });
      }
    }
  }

  // Append active administrative events to the live terminal log
  function logAdminEvent(category, message) {
    const logContainer = document.getElementById('systemEventLog');
    if (!logContainer) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const entry = document.createElement('div');
    entry.className = `log-entry ${category.toLowerCase()}`;
    entry.innerHTML = `[${timeStr}] <strong>${category.toUpperCase()}</strong>: ${message}`;

    logContainer.appendChild(entry);
    
    while (logContainer.children.length > 30) {
      logContainer.removeChild(logContainer.firstChild);
    }

    logContainer.scrollTop = logContainer.scrollHeight;
  }

  // Fetch live TMZ stories, but FILTER them so they are strictly "getting shaded" (sunglasses/sun/beach/eyewear) related!
  function fetchLiveTmzFeed() {
    const tmzFeedList = document.getElementById('tmzFeedList');
    if (!tmzFeedList) return;

    // Curated high-fashion sunglasses fallback stories
    const fallbackStories = [
      {
        title: "Austin Butler's Vintage Golden Hour Aviators",
        description: "Seen wearing warm amber tints in Malibu to soften the late afternoon solar glare.",
        link: "https://www.tmz.com",
        pubDate: new Date(),
        emoji: '🍿'
      },
      {
        title: "Trend Alert: Polarized Green is Dominating Aspen",
        description: "Snow glare levels hitting peak factor. Celebs are choosing polarized sport wraps to combat whiteout light.",
        link: "https://www.tmz.com",
        pubDate: new Date(Date.now() - 3 * 3600000),
        emoji: '📈'
      },
      {
        title: "Zendaya's Custom Rose Tints Trend",
        description: "Styled at the London premier. Rose lenses boost contrast and style points alike under overcast skies.",
        link: "https://www.tmz.com",
        pubDate: new Date(Date.now() - 24 * 3600000),
        emoji: '🌟'
      }
    ];

    const rssUrl = 'https://www.tmz.com/rss.xml';
    // Append a unique timestamp parameter to ensure we bypass browser and API proxy cache
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&_t=${Date.now()}`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'ok' && data.items && data.items.length > 0) {
          // Keywords that are STRICTLY about eyewear, sunglasses, or lenses
          const keywords = [
            'sunglass', 'sunglasses', 'shades', 'eyewear', 
            'glasses', 'frames', 'specs', 'lens', 'lenses', 
            'aviator', 'aviators', 'goggle', 'goggles'
          ];

          // Filter live stories where the description specifically contains eyewear keywords
          const matchedStories = data.items.filter(item => {
            const desc = (item.description || '').toLowerCase();
            return keywords.some(kw => desc.includes(kw));
          });

          // Build final list (prefer matched live stories, pad with fallbacks if needed)
          const finalStories = [];
          
          matchedStories.forEach(item => {
            finalStories.push({
              title: item.title,
              description: item.description,
              link: item.link,
              pubDate: new Date(item.pubDate),
              emoji: '📸' // indicator for live parsed news
            });
          });

          // If we have less than 3 relevant live stories, pad with our highly curated sunglasses fallbacks
          if (finalStories.length < 3) {
            fallbackStories.forEach(fb => {
              if (!finalStories.some(fs => fs.title.toLowerCase() === fb.title.toLowerCase())) {
                finalStories.push(fb);
              }
            });
          }

          // Limit to top 3 strictly relevant stories
          const displayStories = finalStories.slice(0, 3);
          
          tmzFeedList.innerHTML = '';
          logAdminEvent('api', `Matched ${matchedStories.length} live eyewear stories (Rendered: ${displayStories.length})`);
          displayStories.forEach(item => {
            // Relative time calculation
            let timeLabel = 'Recently';
            try {
              const diffMs = new Date() - item.pubDate;
              const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
              
              if (diffHrs < 1) {
                timeLabel = 'Just now';
              } else if (diffHrs === 1) {
                timeLabel = '1 hour ago';
              } else if (diffHrs < 24) {
                timeLabel = `${diffHrs} hours ago`;
              } else {
                timeLabel = 'Yesterday';
              }
            } catch (e) {
              console.warn(e);
            }

            // Clean description text
            let cleanDesc = item.description || '';
            cleanDesc = cleanDesc.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
            if (cleanDesc.length > 125) {
              cleanDesc = cleanDesc.substring(0, 122) + '...';
            }

            const newsItem = document.createElement('div');
            newsItem.className = 'tmz-news-item';
            newsItem.innerHTML = `
              <div class="tmz-news-thumb">${item.emoji}</div>
              <div class="tmz-news-body">
                <h4><a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a></h4>
                <p>${cleanDesc}</p>
                <span class="news-time">${timeLabel}</span>
              </div>
            `;
            tmzFeedList.appendChild(newsItem);
          });
        }
      })
      .catch(err => {
        console.warn('Could not retrieve live TMZ RSS feed, keeping static fallbacks:', err);
        renderFallbackFeed();
      });

    function renderFallbackFeed() {
      tmzFeedList.innerHTML = '';
      fallbackStories.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'tmz-news-item';
        newsItem.innerHTML = `
          <div class="tmz-news-thumb">${item.emoji}</div>
          <div class="tmz-news-body">
            <h4><a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a></h4>
            <p>${item.description}</p>
            <span class="news-time">Yesterday</span>
          </div>
        `;
        tmzFeedList.appendChild(newsItem);
      });
    }
  }

  // ==========================================
  // 5. INITIALIZATION
  // ==========================================
  
  function init() {
    setupTabs();
    setupSlider();
    setupWeatherPresets();
    setupTintControls();
    setupQuiz();
    setupAdminAuth();

    // 1. Immediately load the static 'sunny' preset for Miami so the UI is fully populated & functional instantly
    logAdminEvent('sys', 'Initialized ShadeCast core UI controllers');
    logAdminEvent('sys', 'Active startup geolocation geode resolution...');

    // 1. Immediately load the static 'sunny' preset for Miami so the UI is fully populated & functional instantly
    updateWeatherUI('sunny');
    applyTint('grey');
    updatePolarizationSimulator();
    updateQuizStepUI();

    // 2. Asynchronously request GPS/Weather to update dynamically in the background
    initGeolocation();

    // 3. Retrieve actual live TMZ gossip feed
    fetchLiveTmzFeed();

    // 4. Bind dynamic click tracking for live TMZ links to track commercial referral value
    const tmzFeedList = document.getElementById('tmzFeedList');
    if (tmzFeedList) {
      tmzFeedList.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
          analytics.tmzClicks++;
          updateTelemetryUI();
          logAdminEvent('sys', 'Outbound celebrity gossip affiliate referral clicked');
        }
      });
    }

    // 5. Initialize the SaaS Telemetry Dashboard panel values
    updateTelemetryUI();
  }

  init();
});
