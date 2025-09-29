import logo from '../assets/logo.png'
import food1 from '../assets/food1.png'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Onboard() {
  const navigate = useNavigate()

useEffect(()=>{
  setTimeout(()=>{
    navigate('/login', {replace: true})
  }, 1000)
}, [])

  return (
    <div className="fixed inset-0 bg-[#FFEEDA] flex items-center justify-center">
      <img src={logo} alt="" />
      <img className='
      absolute bottom-0 left-0 dropShadow
      'src={food1} alt="" />
      
    </div>
  )
}
 