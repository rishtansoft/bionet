import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignIn, apiSignOut, apiSignUp } from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'

function useAuth() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async (values) => {
        try {
            const resp = await apiSignIn(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(onSignInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp =  (values) => {
        try {
             apiSignUp(values).then((res)=>{
                console.log(57, res);    
            }).catch((error)=>{
                console.log(error);
            })
            
            // if (resp.data) {
            //     console.log(59, resp);
            //     const { token } = resp.data
            //     dispatch(onSignInSuccess(token))
            //     if (resp.data.user) {
            //         dispatch(
            //             setUser(
            //                 resp.data.user || {
            //                     avatar: '',
            //                     userName: 'Anonymous',
            //                     authority: ['USER'],
            //                     email: '',
            //                 }
            //             )
            //         )
            //     }
            //     const redirectUrl = query.get(REDIRECT_URL_KEY)
            //     console.log(73, redirectUrl);
            //     console.log(74, appConfig.authenticatedEntryPath);
            //     navigate(
            //         redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
            //     )
                
            //     return {
            //         status: 'success',
            //         message: '',
            //     }
            // }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
