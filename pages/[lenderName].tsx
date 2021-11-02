import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Form from './components/formComponent'
import Modal from './components/modal'
import { Typography } from '@material-ui/core';

const LenderNamePage: NextPage = () => {
  const router = useRouter();
  const lenderSlug = router.query.lenderName?.toString();
  const [userInputData, setUserInputData] = useState<{ [key: string]: string }>({})
  const [formData, setFormData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [formSubmissionComplete, setFormSubmissionComplete] = useState(false)

  const onChangeHandler = (fieldId: string, value: string | boolean) => {
    setUserInputData(currentData => {
      userInputData[fieldId] = String(value)
      return currentData
    });
  }

  useEffect(() => {
    const getData = async () => {
      const res = await (await fetch(`/api/lenders/${lenderSlug}`)).json()
      if (res) {
        setFormData(res.fields)
      }
    }

    lenderSlug && getData()
  }, [lenderSlug])

  const onSubmit = async (event: { preventDefault: any; }) => {
    event.preventDefault()
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
      setModalMessage('Form submission succesful')
      setFormSubmissionComplete(true)
    }
    setShowModal(true)
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
    <Form
      formData={formData}
      submitHandler={onSubmit}
      onChangeHandler={onChangeHandler}
      userInputData={userInputData} />
    <Modal message={modalMessage} okHandler={navigateToHome} showModal={showModal} />
  </Grid>;
};

export default LenderNamePage;
