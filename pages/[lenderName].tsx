import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Form from './components/formComponent'
import Modal from './components/modal'
import { Typography } from '@material-ui/core';
import Loader from "react-loader-spinner";

const LenderNamePage: NextPage = () => {
  const router = useRouter();
  const lenderSlug = router.query.lenderName?.toString();
  const [userInputData, setUserInputData] = useState<{ [key: string]: string }>({})
  const [formData, setFormData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [formSubmissionComplete, setFormSubmissionComplete] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

  const onChangeHandler = (fieldId: string, value: string | boolean) => {
    setUserInputData(currentData => {
      userInputData[fieldId] = String(value)
      return currentData
    });
  }

  useEffect(() => {
    setFormData([])
    const getData = async () => {
      setShowLoader(true)
      const res = await (await fetch(`/api/lenders/${lenderSlug}`)).json()
      if (res) {
        setFormData(res.fields)
      }
      setShowLoader(false)
    }

    lenderSlug && getData()
  }, [lenderSlug])

  const onSubmit = async (event: { preventDefault: any; }) => {
    event.preventDefault()
    setShowLoader(true)
    setFormSubmissionComplete(false)
    setShowModal(false)
    const request = {
      method: 'POST',
      body: JSON.stringify(userInputData)
    }

    const res = await (await fetch(`/api/lenders/${lenderSlug}`, request)).json()
    if (res.decision.toUpperCase() === 'DECLINED') {
      setModalMessage('Form submission failed')
    } else {
      setModalMessage('Form submission succesful, redirecting to home page')
      setFormSubmissionComplete(true)
    }
    setShowModal(true)
    setShowLoader(false)
  }

  const navigateToHome = () => {
    if (formSubmissionComplete) {
      window.location.href = '/'
    }
  }

  return <Grid style={{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }}><Typography variant="h5" component="h5">
      {lenderSlug}
    </Typography>
    {!showLoader ?
      (<Form
        formData={formData}
        submitHandler={onSubmit}
        onChangeHandler={onChangeHandler}
        userInputData={userInputData} />
      ) :
      (<Loader
        type="TailSpin"
        color="#808080"
        height={100}
        width={100}
      />)}

    <Modal message={modalMessage} okHandler={navigateToHome} showModal={showModal} />
  </Grid>;
};

export default LenderNamePage;
