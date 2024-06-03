export default function Item({url}) {
    return(
        <img id="item" draggable="false" className='w-full h-full' src={url} />
    )
}