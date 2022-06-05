let trackingData = null

document.addEventListener('DOMContentLoaded', () => {
  const trackingButtons = document.querySelectorAll('.nav-item')
  getTrackingData()
    .then(data => {
      trackingData = data
      
      trackingButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          changeView(event.target, trackingButtons, trackingData)
        })
      });
    })
})

async function getTrackingData(){
  const response = await fetch('assets/data.json')
  return response.json()
}

function changeView(button, trackingButtons, trackingData){
  trackingButtons.forEach(trackingButton => {
    trackingButton.classList.remove('active')
  })
  button.classList.add('active')

  let currentMode = button.dataset.mode

  trackingData.forEach(type => {
    try{
      const trackingCard = document.getElementById(`resume${type.title.replace(/\s/g,'')}`)

      if(trackingCard != null){
        increaseNumberAnimation(trackingCard.getElementsByClassName('quantity')[0], type.timeframes[currentMode].previous)
        
        trackingCard.getElementsByClassName('description')[0].innerHTML = getDescriptionText(currentMode, type.timeframes[currentMode].previous)
      }
    }catch(error){
      console.log(error)
    }
  })
}

function getDescriptionText(mode, description){
  switch (mode) {
    case 'daily':
      return `Last day - ${description}hrs`
    case 'weekly':
      return `Last week - ${description}hrs`
    case 'monthly':
      return `Last month ${description}hrs`
    default:
      return '';
  }
}

function increaseNumberAnimation(element, limit){
  if(element != null){
    incrementNumber(0, limit, element)
  }
}

function incrementNumber(index, limit, element){
  element.innerHTML = index
  if(index <= limit){
    setTimeout(() => incrementNumber(index + 5, limit, element), 10)
  }
}