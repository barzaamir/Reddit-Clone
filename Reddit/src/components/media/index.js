export default function Media(props){
    if(props.url)
        return <p style={{wordWrap:" break-word"}}>URL:<a href={props.url} rel="noreferrer" target="_blank">{props.url}</a></p>
    else if(props.text)
        return <p style={{wordWrap:" break-word"}}>{props.text}</p>
    else if(props.img){
        let link='http://localhost:8000/post/getimg?key='+props.img;
        return<p style={{textAlign:"center"}}><img src={link} alt="img" style={{maxWidth:"100%"}}></img></p>
    }
    return<></>
}