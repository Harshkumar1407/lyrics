const form=document.getElementById('form')
const search=document.getElementById('search')
const result=document.getElementById('result')

const apiURL='https://api.lyrics.ovh'
//adding event lisstener in form

form.addEventListener('submit',e=>{
    e.preventDefault();
    searchValue=search.value.trim(); // here u made mistake its value not Value


    //checking search value is empty or not
    if(!searchValue){
        alert('There is nothing to search')
    }
    else{
        searchSong(searchValue)
     
    }
})
//search song
async function searchSong(searchValue){
    alert(searchValue)
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`) // space betweeen await and fetch
    const data= await searchResult.json();
    showData(data)

}

function showData(data){
    result.innerHTML=`
    <ul class="song-list">
    ${data.data.map(song=> `<li>
                             <div>
                                <strong>
                                ${song.artist.name}
                                </strong> - ${song.title}
                              </div>  
                              <span data-artist="${song.artist.name}" data-songtitle="${song.title}" >
                                  get lyrics
                                  </span>
                                  </li>
    `).join('')
    }
    </ul>
    `
}



result.addEventListener('click',e=>{
    const clickedElement = e.target;
    if(clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle'); 
        getLyrics(artist, songTitle)
    }


})

async function getLyrics(artist, songTitle){
    alert(artist+songTitle);
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data =  await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>') ;// check this line once
    result.innerHTML = `<h2> 
                            <strong>${artist} </strong> - ${songTitle}
                        </h2>
                        <p> ${lyrics} </p>
                    `
}