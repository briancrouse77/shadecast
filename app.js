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
  const resultTint = document.getElementById('resultTint');
  const resultPolar = document.getElementById('resultPolar');
  const btnRestartQuiz = document.getElementById('btnRestartQuiz');

  // ==========================================
  // 3. EVENT LISTENERS & LOGIC
  // ==========================================

  // Tab Switching
  function setupTabs() {
    [tabBtnTmz, tabBtnQuiz].forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTabId = btn.getAttribute('data-tab');
        
        tabBtnTmz.classList.remove('active');
        tabBtnQuiz.classList.remove('active');
        btn.classList.add('active');

        tabTmz.classList.remove('active');
        tabQuiz.classList.remove('active');
        
        if (targetTabId === 'tabTmz') {
          tabTmz.classList.add('active');
        } else {
          tabQuiz.classList.add('active');
        }
      });
    });
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

    // Try auto-detecting on startup. "If we can figure it out set it, if not let them."
    triggerGeolocation(true);
  }

  function updateLocationStatus(text, isGps = false) {
    const statusText = document.getElementById('locationStatusText');
    const indicatorDot = document.getElementById('locIndicatorDot');
    if (statusText) statusText.textContent = text;
    if (indicatorDot) {
      if (isGps) {
        indicatorDot.classList.add('live-gps');
      } else {
        indicatorDot.classList.remove('live-gps');
      }
    }
  }

  // Geolocation API call (tries IP lookup first, then falls back to browser GPS)
  function triggerGeolocation(isStartup = false) {
    updateLocationStatus('Locating...', true);

    // 1. Try IP Geolocation first (fully automatic, no permission popups, supports localhost)
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.latitude && data.longitude) {
          const city = data.city || 'Detected City';
          const region = data.region_code || '';
          const displayName = region ? `${city}, ${region}` : city;
          
          fetchWeatherForCoordinates(data.latitude, data.longitude, displayName, true);
        } else {
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
    updateLocationStatus('Loading weather...', isGps);
    
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,uv_index,is_day&temperature_unit=fahrenheit&wind_speed_unit=mph`;
    
    fetch(weatherUrl)
      .then(res => res.json())
      .then(data => {
        if (data.current) {
          const temp = Math.round(data.current.temperature_2m);
          const rawUv = data.current.uv_index || 0;
          const uvVal = Math.round(rawUv);
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
          const isNight = !isDay;
          if (isNight) {
            dynamicPreset.tmzImg = 'assets/celebrity_cloudy.jpg';
            dynamicPreset.tmzBadge = 'SPOTTED AT MIDNIGHT';
            dynamicPreset.tmzTitle = 'Rihanna Rocks Clear Aviator Tints';
            dynamicPreset.tmzDesc = 'Seen wearing light Category 0 clear frames at a midnight afterparty, blocking flashing cameras.';
          } else if (tempPreset === 'glare') {
            dynamicPreset.tmzImg = 'assets/celebrity_snow.jpg';
            dynamicPreset.tmzBadge = 'SPOTTED IN ASPEN';
            dynamicPreset.tmzTitle = 'Gwyneth Paltrow in Mirrored Shields';
            dynamicPreset.tmzDesc = 'Seen hitting the slopes in Aspen in oversized pink polarized ski goggles to filter snow reflection.';
          } else if (tempPreset === 'sunset') {
            dynamicPreset.tmzImg = 'assets/celebrity_sunset.jpg';
            dynamicPreset.tmzBadge = 'SPOTTED IN MALIBU';
            dynamicPreset.tmzTitle = 'Jensen Ackles in Retro Amber Aviators';
            dynamicPreset.tmzDesc = 'Spotted walking the Malibu pier at golden hour wearing vintage tortoiseshell amber glasses.';
          } else if (tempPreset === 'overcast') {
            dynamicPreset.tmzImg = 'assets/celebrity_cloudy.jpg';
            dynamicPreset.tmzBadge = 'SPOTTED IN LONDON';
            dynamicPreset.tmzTitle = 'Lily Collins in Transitional Tints';
            dynamicPreset.tmzDesc = 'Seen strolling London streets in overcast weather styling thin metal-frame wire glasses.';
          } else {
            dynamicPreset.tmzImg = 'assets/celebrity.jpg';
            dynamicPreset.tmzBadge = 'SPOTTED IN BEVERLY HILLS';
            dynamicPreset.tmzTitle = 'Hailey Bieber Rocks Matte Acetate Shields';
            dynamicPreset.tmzDesc = 'Matching the extreme California sun with blacked-out wrap-around shields.';
          }

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
          currentQuizStep = 2;
        } else if (currentQuizStep === 2) {
          quizAnswers.sensitivity = optionVal;
          currentQuizStep = 3;
        } else if (currentQuizStep === 3) {
          quizAnswers.aesthetic = optionVal;
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
    });
  }

  function calculateQuizResult() {
    let name = 'The Classic Wayfarer';
    let desc = 'Timeless slate frames featuring balanced grey lenses for comfort, style, and natural true-color vision.';
    let tint = 'Grey Tints';
    let polar = 'Recommended';

    const act = quizAnswers.activity;
    const sens = quizAnswers.sensitivity;
    const aes = quizAnswers.aesthetic;

    if (act === 'beach' || act === 'sports') {
      polar = 'Yes (Required)';
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

    resultName.textContent = name;
    resultDesc.textContent = desc;
    resultTint.textContent = tint;
    resultPolar.textContent = polar;
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

    // 1. Immediately load the static 'sunny' preset for Miami so the UI is fully populated & functional instantly
    updateWeatherUI('sunny');
    applyTint('grey');
    updatePolarizationSimulator();
    updateQuizStepUI();

    // 2. Asynchronously request GPS/Weather to update dynamically in the background
    initGeolocation();
  }

  init();
});
