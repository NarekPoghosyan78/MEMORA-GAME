export function initSettings(soundtrack, flipCardInner){
    const restartAll = document.getElementById('restartAll-game-btn');
    const volumeRange = document.getElementById('volume');
    const volumePercentage = document.getElementById('volumePercentage');
    const volumeIcon = document.querySelector('#volumeLabel i');
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    const toggleAnimation = document.getElementById('animation'); 
    const difficultyMode = document.querySelectorAll('input[name="difficulty"]');
    difficultyMode.forEach((mode)=>{
        if(mode.id == localStorage.getItem('mode')){
            mode.checked = true;
        }
    })
    if(localStorage.getItem('animation') == 'true'){
        toggleAnimation.classList.add('on-off')
    }else{
        toggleAnimation.classList.remove('on-off')
    }
    let volumeValue = localStorage.getItem('volume');
    volumeRange.value = volumeValue;
    let volumeIconType = 'fa-volume';
    volumeIcon.className = `fa-solid ${volumeIconType}`;
    volumePercentage.textContent = volumeValue;
    volumeRange.addEventListener('change', ()=>{
        volumeValue = Number(volumeRange.value)
        volumePercentage.textContent = volumeValue;
        volumeIconType = 
                volumeValue === 0
                    ? "fa-volume-off"
                    : volumeValue <= 30
                    ? "fa-volume-low"
                    : volumeValue <= 70
                    ? "fa-volume"
                    : "fa-volume-high";
        volumeIcon.className = `fa-solid ${volumeIconType}`;
        soundtrack.volume = Number(volumeValue.toString().length === 1 ? `0.0${volumeValue}` : volumeValue !== 100 ? `0.${volumeValue}` : 1);    
    });
    volumeIcon.addEventListener('click', ()=>{
        volumeIconType = volumeIconType !== 'fa-volume-xmark' ? 'fa-volume-xmark' : volumeValue === 0
                    ? "fa-volume-off"
                    : volumeValue <= 30
                    ? "fa-volume-low"
                    : volumeValue <= 70
                    ? "fa-volume"
                    : "fa-volume-high"; ;
        if(volumeIconType === 'fa-volume-xmark'){
            volumeRange.value = 0;
            volumePercentage.textContent = 0; 
            soundtrack.volume = 0;
        }else{
            volumeRange.value = volumeValue;
            volumePercentage.textContent = volumeValue; 
            soundtrack.volume = Number(volumeValue.toString().length === 1 ? `0.0${volumeValue}` : volumeValue !== 100 ? `0.${volumeValue}` : 1);    
        }
        volumeIcon.className = `fa-solid ${volumeIconType}`;
    });
    restartAll.addEventListener('click', ()=>{
        localStorage.setItem('mode', 'medium-mode');
        localStorage.setItem('volume', '50');
        localStorage.setItem('animation', 'true');
        location.reload()
    })
    saveChangesBtn.addEventListener('click', ()=>{
        const selected = document.querySelector('input[name="difficulty"]:checked');
        localStorage.setItem('mode', selected.id);
        localStorage.setItem('volume', volumeRange.value);
        localStorage.setItem('animation', toggleAnimation.classList.contains('on-off') ? 'true' : 'false');
        location.reload();
    });
    toggleAnimation.addEventListener('change', ()=>{
        toggleAnimation.classList.toggle('on-off');
    })
}