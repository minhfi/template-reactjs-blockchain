import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import bgIcon1 from '@/static/image/software/Group-8.png'
import bgIcon2 from '@/static/image/software/Group-19.png'
import bgIcon3 from '@/static/image/software/Group-4.png'
import { useHistory } from 'react-router'
import useWindowResize from '@/hooks/useWindowResize'

import MBBankBanner from '@/static/image/software/mb/header-banner.png'
import VietjectBanner from '@/static/image/software/vietject/header-banner.png'
import MauaBanner from '@/static/image/software/maua/header-banner.png'
import WMCBanner from '@/static/image/software/wmc/header-banner.png'
import KimanBanner from '@/static/image/software/kiman/header-banner.png'
import ABCBanner from '@/static/image/software/acb/header-banner.png'
import HDBankBanner from '@/static/image/software/hdbank/header-banner.png'
import VietinBanner from '@/static/image/software/vietin/header-banner.png'

const index = () => {
  const history = useHistory()
  const imgRef = useRef(null)
  const boxCenterRef = useRef(null)
  const MBBankRef = useRef(null)
  const HDBankRef = useRef(null)
  const fieldTechRef = useRef(null)
  const airlineRef = useRef(null)
  const bankingFinanceRef = useRef(null)
  const hospitalRef = useRef(null)
  const [imgUrl, setImgUrl] = useState(null)
  const [isCenterHover, setIsCenterHover] = useState(false)
  const [styleBoxProduct, setStyleBoxProduct] = useState({})
  const [isIpadDown, setIsIpadDown] = useState(false)
  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setIsIpadDown(true)
    } else {
      setIsIpadDown(false)
    }
  }
  useWindowResize(handleResize)

  const imgMapped = {
    mbbank: MBBankBanner,
    vietinbank: VietinBanner,
    vietjet: VietjectBanner,
    hdbank: HDBankBanner,
    maua: MauaBanner,
    acbank: ABCBanner,
    kiman: KimanBanner,
    wmc: WMCBanner
  }

  const fieldList = [{
    ref: bankingFinanceRef,
    field: 'banking'
  },
  {
    ref: airlineRef,
    field: 'airline'
  },
  {
    ref: fieldTechRef,
    field: 'ecommerce'
  },
  {
    ref: hospitalRef,
    field: 'hospital'
  }]

  const effectField = (field, action = 'add') => {
    if (action === 'add') {
      fieldList.forEach(item => {
        if (item.field !== field) {
          item.ref.current.classList[action]('no-hover')
        } else {
          item.ref.current.classList.remove('no-hover')
        }
      })
    } else {
      fieldList.forEach(item => {
        item.ref.current.classList[action]('no-hover')
      })
    }
  }

  const handleHover = (project, field) => (e) => {
    e.persist()
    if (!isIpadDown) {
      const itemList = document.querySelectorAll('.software-item')

      const {
        height,
        width
      } = boxCenterRef.current?.getBoundingClientRect()

      const styleOfProductBox = {
        height,
        width
      }

      effectField(field)

      itemList.forEach(item => {
        if (item.getAttribute('data-id') !== project) {
          item.classList.add('no-hover')
        }
      })

      if (project === 'vietinbank') {
        MBBankRef.current.style.borderWidth = '0px'

        HDBankRef.current.style.borderWidth = '0px'

        styleOfProductBox.borderWidth = '1px'
        styleOfProductBox.borderLeftWidth = '0px'
        setIsCenterHover(true)
      } else {
        MBBankRef.current.style.borderWidth = '1px'

        HDBankRef.current.style.borderWidth = '1px'

        styleOfProductBox.borderWidth = '1px'
        styleOfProductBox.borderLeftWidth = '1px'
      }

      setImgUrl(() => imgMapped[project])
      setStyleBoxProduct(styleOfProductBox)
    }
  }

  const handleMouseLeave = () => {
    if (!isIpadDown) {
      const itemList = document.querySelectorAll('.software-item')

      itemList.forEach(item => {
        item.classList.remove('no-hover')
      })

      effectField('', 'remove')

      if (isCenterHover) {
        setIsCenterHover(false)
      }

      MBBankRef.current.style.borderWidth = '1px'

      HDBankRef.current.style.borderWidth = '1px'

      setImgUrl(null)
    }
  }

  useEffect(() => {
    handleResize()
  }, [])

  const handleRedirect = path => history.push(`/software/${path}`)

  const renderProjects = () => {
    return (
      <div className="software-list">
        <div
          ref={MBBankRef}
          className="software-item"
          data-id="mbbank"
          onClick={() => handleRedirect('mb-bank')}
          onMouseEnter={handleHover('mbbank', 'banking')}
          onMouseLeave={handleMouseLeave}
          style={{
            zIndex: isCenterHover ? 100 : 'unset'
          }}
        >
          {!isCenterHover && <h2 className="heading-2">MB Ageas life</h2>}
        </div>
        <div
          ref={boxCenterRef}
          className="software-item"
          data-id="vietinbank"
          onClick={() => handleRedirect('vietin-bank')}
          onMouseEnter={handleHover('vietinbank', 'banking')}
          onMouseLeave={handleMouseLeave}
        >
          <span ref={bankingFinanceRef} data-id="mbbank">Banking & Finance</span>
          {(isCenterHover || (!imgUrl && !isCenterHover)) && <h2 className="heading-2">VietinBank</h2>}
          <CSSTransition
            in={Boolean(imgUrl)}
            classNames="fade"
            unmountOnExit
            timeout={600}
          >
            <div
              onMouseEnter={handleHover('vietinbank', 'banking')}
              className="software-product-show" style={{
                left: isCenterHover ? `${-styleBoxProduct?.width}px` : '0',
                ...styleBoxProduct
              }}
            >
              <img ref={imgRef} src={imgUrl} alt="software-product"/>
            </div>
          </CSSTransition>
        </div>
        <div
          className="software-item"
          data-id="vietjet"
          onClick={() => handleRedirect('vietjet')}
          onMouseEnter={handleHover('vietjet', 'airline')}
          onMouseLeave={handleMouseLeave}
        >
          <span ref={airlineRef}>Airline</span>
          <h2 className="heading-2">Vietjet Air</h2>
        </div>
        <div
          ref={HDBankRef}
          className="software-item"
          data-id="hdbank"
          onClick={() => handleRedirect('hd-bank')}
          onMouseEnter={handleHover('hdbank', 'banking')}
          onMouseLeave={handleMouseLeave}
          style={{
            zIndex: isCenterHover ? 100 : 'unset'
          }}
        >
          {!isCenterHover && <h2 className="heading-2">HDBank</h2>}
        </div>
        <div
          className="software-item"
          data-id="maua"
          onClick={() => handleRedirect('maua')}
          onMouseEnter={handleHover('maua', 'ecommerce')}
          onMouseLeave={handleMouseLeave}
        >
          <span ref={fieldTechRef} data-id="maua">Ecommerce</span>
          <h2 className="heading-2">Maua</h2>
        </div>
        <div
          className="software-item"
          data-id="acbank"
          onClick={() => handleRedirect('acb')}
          onMouseEnter={handleHover('acbank', 'banking')}
          onMouseLeave={handleMouseLeave}
        >
          <h2 className="heading-2">ACB</h2>
        </div>
        <div
          className="software-item"
          data-id="kiman"
          onClick={() => handleRedirect('kiman')}
          onMouseEnter={handleHover('kiman', 'banking')}
          onMouseLeave={handleMouseLeave}
        >
          <h2 className="heading-2">Kim An group</h2>
        </div>
        <div
          className="software-item"
          data-id="wmc"
          onClick={() => handleRedirect('wmc')}
          onMouseEnter={handleHover('wmc', 'hospital')}
          onMouseLeave={handleMouseLeave}
        >
          <span ref={hospitalRef}>Hospitality</span>
          <h2 className="heading-2">WMC</h2>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="software">
        <div className="software-main">
          <div className="software-bg-icon icon-1">
            <img src={bgIcon1} alt="background-software"/>
          </div>
          <div className="software-bg-icon icon-2">
            <img src={bgIcon2} alt="background-software"/>
          </div>
          <div className="software-bg-icon icon-3">
            <img src={bgIcon3} alt="background-software"/>
          </div>
          <div className="software-content">
            {renderProjects()}
          </div>
        </div>
      </div>
    </>
  )
}

export default index
