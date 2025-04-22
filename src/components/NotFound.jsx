import { useMediaQuery } from "@mui/material"

const NotFound = ({message}) => {
  const isPad = useMediaQuery('(max-width:1450px)')
  const isMobile = useMediaQuery('(max-width:800px)')
  return (
    <div style={{width: '100%', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1em', opacity: '.3'}}>
        <img style={isMobile ? {width: '10em'} : (isPad ? {width: '20em'} : {width: '30em'})} src="/404.svg" alt="404" />
        <h1 style={isMobile ? {fontSize: '1em'} : {fontSize: '3em'}}>{message}</h1>
    </div>
  )
}

export default NotFound
