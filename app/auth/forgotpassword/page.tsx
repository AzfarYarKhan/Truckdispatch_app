import ForgotPasswordform from './forgotpasswordform'
import getCurrentUser from '@/app/actions/getCurrentUser'

export default async function ForgotPassword(){
  const currentUser = await getCurrentUser();
    return (
       <>
       <ForgotPasswordform   currentUser={currentUser}/>
       </>
    )
}
