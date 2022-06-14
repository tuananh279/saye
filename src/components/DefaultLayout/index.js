import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Progress from "../Progress";
import ProgressLong from "../ProgressLong";
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

function DefaultLayout() {

    const [progress, setProgress] = useState(0)
    const [progressBingo, setProgressBingo] = useState(0)
    const options = [
        {
            cmp: <img src={require('../../assests/imgs/img1.jpg')} alt="Avatar" style={{width: 300, height: 300}} />,
            data: {
                title: 'Xinh đẹp',
                description: 'Em là cô gái rất xinh đẹp!',
                sub: '100 điểm'
            }
        },
        {
            cmp: <img src={require('../../assests/imgs/img2.jpg')} alt="Avatar" style={{width: 300, height: 300}} />,
            data: {
                title: 'Giỏi giang',
                description: 'Em là sinh viên suất sắc.',
                sub: '100 điểm'
            }
        },
        {
            cmp: <img src={require('../../assests/imgs/img3.jpg')} alt="Avatar" style={{width: 300, height: 300}} />,
            data: {
                title: 'Chăm chỉ',
                description: 'Em rất chăm chỉ, chịu khó.',
                sub: '100 điểm'
            }
        },
        {
            cmp: <img src={require('../../assests/imgs/img4.jpg')} alt="Avatar" style={{width: 300, height: 300}} />,
            data: {
                title: 'Cá tính',
                description: 'Cá tính em đây có thừa.',
                sub: '100 điểm'
            }
        },
        {
            cmp: <img src={require('../../assests/imgs/img5.jpg')} alt="Avatar" style={{width: 300, height: 300}} />,
            data: {
                title: 'Yêu anh',
                description: 'Theo cách của em',
                sub: '... điểm'
            }
        },
        {
            cmp: <img src={require('../../assests/imgs/img6.jpg')} alt="Avatar" style={{width: 300, height: 300}} />,
            data: {
                title: 'Xinh đẹp',
                description: 'Em là cô gái rất xinh đẹp!',
                sub: '100 điểm'
            }
        }
    ]
    const [selected, setSelected] = useState([])
    const [isBingo, setIsBingo] = useState(false)
    const { width, height } = useWindowSize()
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setProgress(20)
        }, 500);
    }, [])

    useEffect(() => {
        if(progress < 90) {
            setTimeout(() => {
                setProgress(progress + 30)
            }, 500);
        } else if(progress < 100) {
            setTimeout(() => {
                setProgress(progress + 1)
            }, 800);
        }
    }, [progress])

    useEffect(() => {
        if(progressBingo >= 100) {
            setTimeout(() => {
                setIsBingo(true)
                setProgress(undefined)
            }, 2000);
            setTimeout(() => {
                setIsShow(true)
            }, 10000)
        }
    }, [progressBingo, selected])

    const handleSelectOption = (op) => {
        const isSelected = selected.findIndex(item => item === op)
        console.log("is: ", isSelected, op, selected);
        if(isSelected !== -1) {
            return
        } else {
            setSelected([...selected, op])
            setProgressBingo(progressBingo + (100 / 6))
        }
    }

    return ( 
        <div className={cx('wrapper')}>
            { progress >= 100 && <ProgressLong progress={progressBingo} />}
            { progress < 100 && 
                <div className={cx('loading')}>
                    <span className={cx('name')}>
                        Chào em ThanhBinh
                        <span className={cx('dot')} style={{ left: 150 }}>.</span>
                        <span className={cx('dot-delay')} style={{ left: 155 }}>.</span>
                        <span className={cx('dot')} style={{ left: 160 }}>.</span>
                    </span>
                    <Progress progress={progress} />
                </div>
            }
            { progress >= 100 &&
                <div className={cx('content')}>
                    <h2 style={{ marginBottom: 50 }}>Chọn hình ảnh đi nào: </h2>
                    <div className={cx('container-cards')}>
                        { options.map((op, index) => (
                            <div key={index} className={cx({
                                'flip-card': true,
                                'flip-card-active': selected.findIndex(item => item === op.cmp.props.src) !== -1
                            })} onClick={() => handleSelectOption(op.cmp.props.src)}>
                                <div className={cx("flip-card-inner")}>
                                    <div className={cx("flip-card-front")}>
                                        {op.cmp}
                                    </div>
                                    <div className={cx("flip-card-back")}>
                                        <h1>{op.data.title}</h1> 
                                        <p>{op.data.description}</p> 
                                        <p>{op.data.sub}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            { (isBingo && !isShow) &&
                <div className={cx('container-image')}>
                    <img className={cx('image')} src={require('../../assests/imgs/img7.jpg')} alt="img" style={{ width: '100%'}}/>
                </div>
            }
            {
                (isBingo && isShow) &&
                <div style={{
                    display: "flex",
                    justifyContent: 'center',
                    paddingTop: 100
                }}>
                    <img src={require('../../assests/imgs/birthday_cake.png')} alt="birthday_cake" style={{ width: 300 }} />
                    <div className={cx('container-text')}>
                        <h1 className={cx('text1')}><p>H</p><p>a</p><p>p</p><p>p</p><p>y</p></h1>
                    </div>
                    <div className={cx('container-text2')}>
                        <h1 className={cx('text2')}><p>b</p><p>i</p><p>r</p><p>t</p><p>h</p><p>d</p><p>a</p><p>y</p></h1>
                    </div>
                </div>
            }
            { isBingo && 
                <Confetti width={width} height={height} />
            }
        </div>
    );
}

export default DefaultLayout;