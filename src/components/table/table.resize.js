import {$} from "@core/dom";

export function resizeHandler($root, event) {
    // console.log('start resizing', event.target.dataset.resize)
    const $resizer = $(event.target)
    // const $parent = $resizer.$el.parentNode // bad
    // const $parent =$resizer.$el.closest('.column') // better
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
    })

    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
    document.onmousemove = (e) => {
        if (type === 'col') {
            const delta = Math.floor(e.pageX - coords.right)
            value = coords.width + delta
            $resizer.css({right: -delta + 'px'})
            // $parent.css({width: value + 'px'})
            //     // $parent.$el.style.width = value + 'px'
            // cells.forEach((el) => el.style.width = value + 'px ')
        } else {
            const delta = Math.floor(e.pageY - coords.bottom)
            value = coords.height + delta
            $resizer.css({bottom: -delta + 'px'})
            // $parent.css({height: value + 'px'})
        }
    }
    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        if (type === 'col') {
            $parent.css({width: value + 'px'})
            cells.forEach((el) => el.style.width = value + 'px ')
        } else {
            $parent.css({height: value + 'px'})
        }

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })
    }
}
