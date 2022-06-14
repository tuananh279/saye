import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from './Progress.module.scss'

const cx = classNames.bind(styles)

function Progress({ progress }) {

    const [style, setStyle] = useState({})
    useEffect(() => {
        const newStyle = {
            opacity: 1,
            width: `${progress}%`
        }
        
        setStyle(newStyle);
    }, [progress])

    return (
		<div className={cx('progress')}>
			<div className={cx('progress-done')} style={style}>
			</div>
		</div>
	)
}

export default Progress;