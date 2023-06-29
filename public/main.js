const convertButton = document.getElementById('convertButton');
const debugButton = document.getElementById('debugButton');
const checkButton = document.getElementById('checkButton');
const inputTextarea = document.getElementById('input');
const outputTextarea = document.getElementById('output');
const fromLanguageSelect = document.getElementById('fromLanguage');
const toLanguageSelect = document.getElementById('toLanguage');

convertButton.addEventListener('click', async () => {
  const code = inputTextarea.value;
  const fromLanguage = fromLanguageSelect.value;
  const toLanguage = toLanguageSelect.value;
  outputTextarea.textContent="Loading...";
  convertButton.classList.add("loading")
  convertButton.style.paddingRight="35px"


 setTimeout(() => {
  fetch('/convert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code, fromLanguage, toLanguage })
  })
    .then(response => response.json())
    .then(data => {
    //   console.log(data)
    outputTextarea.innerHTML = data.response;
    convertButton.classList.remove("loading");
convertButton.style.paddingRight="20px"

    })
    .catch(error => {
        outputTextarea.textContent = 'An error occurred while converting the code.';
      console.error('Error:', error);
    });

 }, 0000);


});


debugButton.addEventListener('click', async () => {
    const code = inputTextarea.value;  
    outputTextarea.textContent="Loading...";
    debugButton.classList.add("loading")
    debugButton.style.paddingRight="35px"
    // Send code and languages to ChatGPT API for conversion

    setTimeout(() => {
    fetch('/debug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
      })
        .then(response => response.json())
        .then(data => {
            outputTextarea.innerHTML = data.response;
            debugButton.classList.remove("loading");
            debugButton.style.paddingRight="20px"
        })
        .catch(error => {
          outputTextarea.textContent = 'An error occurred while converting the code.';
          console.error('Error:', error);
        });
      }, 3000);


  });


  checkButton.addEventListener('click', async () => {
    const code = inputTextarea.value;
    const fromLanguage = fromLanguageSelect.value;
    const toLanguage = toLanguageSelect.value;
    outputTextarea.textContent="Loading...";
    checkButton.classList.add("loading")
    checkButton.style.paddingRight="35px"
    
    setTimeout(() => {
    fetch('/quality', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: code })
    })
      .then(response => response.json())
      .then(data => {
          outputTextarea.innerHTML = data.response;
          checkButton.classList.remove("loading");
          checkButton.style.paddingRight="20px"
      })
      .catch(error => {
        outputTextarea.textContent = 'An error occurred while converting the code.';
        console.error('Error:', error);
      });
    }, 3000);
  });


// Get the "Copy code" button element
const copyButton = document.getElementById("copyButton");

// Add a click event listener to the button
copyButton.addEventListener("click", () => {
  // Get the output textarea element
  const outputTextarea = document.getElementById("output");

  // Select the text inside the output textarea
  outputTextarea.select();

  // Copy the selected text to the clipboard
  document.execCommand("copy");

  // Deselect the text
  window.getSelection().removeAllRanges();

  // Update the button text
  copyButton.textContent = "Copied!";
});

// Reset the button text when the user clicks outside the textarea
document.addEventListener("click", (event) => {
  const outputTextarea = document.getElementById("output");

  if (!outputTextarea.contains(event.target)) {
    copyButton.textContent = "copy";
  }
});
