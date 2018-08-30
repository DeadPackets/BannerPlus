/* eslint-disable */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    callback(tab);
  });

}

function checkAutoLogin(value, cb) {
  if (value) {
    let username = $('[name="username"]').val();
    let password = $('[name="password"]').val();
    if (username !== '' && password !== '') {
      chrome.storage.sync.set({
        username
      });
      chrome.storage.sync.set({
        password
      });
      chrome.storage.local.set({
        autoLogin: true
      })
    } else {
      cb();
    }
  }
}

function clickSwitch(name, currentValue, tab) {

  if (name == 'autoLogin') {
    checkAutoLogin(currentValue, () => {
      swal({
        title: 'Oops!',
        text: 'Please fill in both the username and password fields.',
        icon: 'warning'
      })
      chrome.storage.local.set({
        autoLogin: false
      });

      return;
    })
  } else if (name == 'darkTheme') {
    chrome.storage.sync.set({
      darkTheme: currentValue
    }, () => {
      window.close();
    });
  }

  let data = {};
  data[name] = currentValue;
  chrome.storage.local.set(data);

  chrome.storage.local.get(['disableAutoRefresh'], (result) => {
    if (result.disableAutoRefresh !== true) {
      chrome.tabs.reload(tab.id, {
        bypassCache: true
      });
    }
  })
}

function initializeSwitches(tab) {
  $('.checkbox-switch').each((i, item) => {
    let name = $(item).attr('name');

    if (name == 'autoLogin') {
      chrome.storage.sync.get(['username', 'password'], (result) => {
        $('[name="username"]').val(result.username);
        $('[name="password"]').val(result.password);
      })
    }
    chrome.storage.sync.get(['darkTheme'], (result) => {
      if (result.darkTheme) {
        chrome.storage.local.get([name], (result) => {
          if (result[name]) {
            new Switch(item, {
              size: 'default',
              onSwitchColor: '#2d89ef',
              offSwitchColor: '#202020',
              checked: true,
              onChange: (value) => {
                clickSwitch(name, value, tab);
              }
            });
          } else {
            new Switch(item, {
              size: 'default',
              onSwitchColor: '#2d89ef',
              offSwitchColor: '#202020',
              checked: false,
              onChange: (value) => {
                clickSwitch(name, value, tab);
              }
            });
          }
        })
      } else {
        chrome.storage.local.get([name], (result) => {
          if (result[name]) {
            new Switch(item, {
              size: 'default',
              checked: true,
              onChange: (value) => {
                clickSwitch(name, value, tab);
              }
            });
          } else {
            new Switch(item, {
              size: 'default',
              checked: false,
              onChange: (value) => {
                clickSwitch(name, value, tab);
              }
            });
          }
        })
      }
    })
  });
}

function checkForUpdates() {
  fetch(chrome.extension.getURL('manifest.json'))
    .then((response) => {
      response.json().then((json) => {
        //Set current version
        $('version').text("(v" + json.version + ")");

        fetch('https://raw.githubusercontent.com/DeadPackets/BannerPlus/master/version.json')
          .then((responseGit) => {
            responseGit.json().then((jsonGit) => {
              console.log(`Current Version: ${json.version} and Latest Version: ${jsonGit.version}`);
              if (parseFloat(jsonGit.version) > parseFloat(json.version)) {
                let content = jsonGit.changelog.map((item) => {
                  return (" - " + item);
                })
                content = content.join("\n");
                swal({
                  title: `New Update! (v${jsonGit.version})`,
                  text: `BannerPlus has a new update!\n\nHere is what's new:\n${content}`,
                  buttons: ['Later', 'Update']
                }).then((value) => {
                  //If they picked to update
                  if (value) {
                    window.open('https://deadpackets.github.io/BannerPlus');
                  }
                })
              }
            })
          })
      })
    });
}

function displayDisclaimer(cb) {
  chrome.storage.local.get(['agreeToServeSatan'], (result) => {
    if (result.agreeToServeSatan) {
      cb();
    } else {
      swal({
        title: `Disclaimer`,
        text: `By using BannerPlus, you acknowledge that you are fully responsible for the usage of this extension and all actions that may entail using it.`,
        type: 'warning',
        buttons: ['No thanks', 'I understand']
      }).then((value) => {
        //If they picked to update
        if (value) {
          chrome.storage.local.set({
            agreeToServeSatan: true
          })
          cb();
        } else {
          window.close();
        }
      })
    }
  })
}

function darkTheme() {
  chrome.storage.sync.get(['darkTheme'], (result) => {
    if (result.darkTheme) {
      $('body').css('background-color', '#363636');
      $('span').css('color', '#c5c5c5');
      $('h3').css('color', 'white');
      $('hr').css('border-color', '#8f8f8f');
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((tab) => {
    if (tab.url.indexOf('banner.aus.edu') > -1) {
      darkTheme();
      initializeSwitches(tab);
      checkForUpdates();
      displayDisclaimer(() => {
        return true;
      })
    } else {
      swal({
        title: 'Sorry!',
        text: 'This extension can only be used on banner.',
        icon: 'warning'
      }).then(() => {
        window.close();
      })
    }
  });
});