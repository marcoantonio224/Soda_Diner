(function() { // Immediately invoke function
    // Get browser cookies
    const cookies = document.cookie;
    // Parse cookies and get diner's id
    const dinerID = cookies
                  .split('; ')
                  .find(cookie => cookie.startsWith('diner'))
                  .split('=')[1];
    // Url for diner's information
    const dinerApi = "http://localhost:3000/diner/"+dinerID;
    // Url for soda's information
    const sodasApi = "http://localhost:3000/diner/sodas/info";
    // Delete Soda button
    const $deleteBtn = $('#deleteDiner');
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
        const $sodas = $('#sodas');
        renderDinerSodas(sodas);
        // Assign these elements with the values from the soda object
        $title.text(name);
        $name.text(name);
        $location.text(location);
        $sodas.text(sodas);
    }
    // Render the sodas that are being served in this diner
    const renderDinerSodas = (sodas) => {
        $.ajax({
            type: "GET",
            headers:{
                sodas: sodas
            },
            url: sodasApi
        })
        .done( res => {
            console.log(res)
        })
        .catch(err => console.log(err));        
    }

    // Delete soda
    function deleteSoda() {
        $.ajax({
            type: "DELETE",
            url: dinerApi
        })
        .done( res => {
            alert("Diner successfully deleted!")
            window.location = './diners.html'
        })
        .catch(err => console.log(err)); 
    }

    // Add event listener to delete soda button
    $deleteBtn.on('click', deleteSoda);

  })();
  