(function() { // Immediately invoke function
    // Get browser cookies
    const cookies = document.cookie;
    // Parse cookies and get diner's id
    const dinerID = cookies
                   .split('; ')
                   .find(cookie => cookie.startsWith('diner'))
                   .split('=')[1];   
    // Api for editing diner according to its ID
    const dinerApi = "http://localhost:3000/diner/"+dinerID;
    // Button for editing
    const $editBtn = $('#editDiner');
    // Assign a click event for edit button
    $editBtn.on('click', function (){
        // Convert 'this' button to 'Save'
        $(this).text('Save');
        // Declare all elements of sodas info
        const $name = $('#name');
        const $location = $('#location');
    
        // Get the existing value of the elements
        const nameVal = $name.text();
        const locationVal = $location.text();

       // Assign those previous values to these input for editing
        $name.html(`
            <input name="name" class="edit-input" type='text' value='${nameVal}' />`);
        $location.html(`
            <input name="location" class="edit-input" type='text' value='${locationVal}' />`);
        
        //Unbind this button from the previous click fuction
        $(this).unbind();
        // Assign this button to save details function for ajax request
        $(this).on('click', saveDetails)
    });

    function saveDetails() {
        // Get input elements for editing/saving new values
        const $name = $('input[name="name"]').val();        
        const $location = $('input[name="location"]').val();
        // Create a new soda object
        const dinerObj = {
            name: $name,
            location: $location
        }
        // Send a PUT request to update the document in mongo
        $.ajax({
            type:"PUT",
            url: dinerApi,
            data: dinerObj
        })
        .done(res => {
            // Once updated successfully, render an alert
            alert('Updated diner!')
            location.reload()
        })
        .catch(err => alert('Oops, something went wrong!')); 
    }

  })();
  