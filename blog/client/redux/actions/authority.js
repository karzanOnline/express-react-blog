/**
 * Created by caozheng on 2016/9/20.
 */
export const AUTHORITY = 'AUTHORITY';

export function getAuthority(num) {
    return {
        type : AUTHORITY,
        num
    }
}
