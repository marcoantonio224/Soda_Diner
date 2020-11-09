alert()
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
    // Make diner ajax request
    $.ajax({
        type: "GET",
        url: dinerApi
    })
    .done(res => {
        if(!res.diner) {
            $('section').text('Please choose a diner');
        } else {
            // Render soda in UI
            renderDiner(res.diner);
        }
    }).catch(err=> $('section').text('Please choose a diner') );
    // Render the information for Diner
    const renderDiner = ({ name, location, sodas }) => {
        const $title = $('#title');
        const $name = $('#name');
        const $location = $('#location');
        renderDinerSodas(sodas);
        // Assign these elements with the values from the soda object
        $title.text(name);
        $name.text(name);
        $location.text(location);
    }

})();