/*
包含n 个工具函数的模块
*/
export function getRedirectPath(type, header) {
    if (type==='1') {
        return header? '/recruit' : '/recruitinfo'
    } else {
        return header? 'applicant' : '/applicantinfo'
    }
}
