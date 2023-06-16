const $ = (id) => document.getElementById(id)

window.addEventListener('load', () => {
  const draggedItems = document.querySelectorAll('.dragged-item')
  for (const item of draggedItems) {
    item.draggable = true
    item.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', event.target.id)
    })
  }

  $('drop-target').addEventListener('dragover', (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  })

  $('drop-target').addEventListener('drop', (event) => {
    let itemId = ''
    event.preventDefault()

    if (event.dataTransfer.items) {
      for (const item of event.dataTransfer.items) {
        const { kind, type } = item
        if (kind === 'file') {
          // Do nothing - item is file
        } else if (kind === 'string') {
          if (type === 'text/plain') {
            itemId = event.dataTransfer.getData(type)
          }
        }
      }
    }

    if (itemId !== '') {
      $('drop-target').innerHTML = $(itemId).innerHTML
    }
  })
})
