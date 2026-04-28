export interface ForgotPasswordResponse {
  statusMsg: string
  message: string
}


export interface VerifyResetResponse{
    status: string
}

export interface ResetPasswordResponse{
    token: string
}