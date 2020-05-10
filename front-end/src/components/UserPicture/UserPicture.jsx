import React from 'react';
import { userTypes } from 'constants/userTypes';

const UserPicture = ({ user, ...rest }) => {
    const getColorClassSuffix  = () => {
        if (user.type === userTypes.STAFF && user.data?.group_type?.length) {
            if (user.data.group_type.length > 1) {
                return 'multi';
            }
            return user.data.group_type[0];
        }
        return 'standard';
    }
    
    const getFirstLetters = () => {
        if (user.data?.first_name?.length && user.data?.last_name?.length) {
            return user.data.first_name[0] + user.data.last_name[0];
        }
        return '?';
    }

    return (
        <div className="userPicture__container" {...rest}>
            <div className={`userPicture userPicture--${getColorClassSuffix()}`}>
                <span>{ getFirstLetters() }</span>
            </div>
        </div>
    )
}

export default UserPicture;
