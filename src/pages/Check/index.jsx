import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Modal, Text } from '../../components'
import warning from '../../assets/warning.png'
import { useGetPackagesIdByCode } from '../../hooks'
import Layout from './Check.layout'
import FormInput from '../../components/FormInput'
import { TextHandlerColorMobile } from './Check.styled'

const Check = () => {
  const [packageCode, setPackageCode] = useState('')
  const [isModalOpen, changeIsModalOpen] = useState(true)
  const history = useHistory()
  const { packages, loading, error } = useGetPackagesIdByCode(packageCode?.packageCode)

  // eslint-disable-next-line complexity
  const toDelivery = async (/** @type {{ packageCode: String; }} */ e) => {
    if (e?.packageCode && !error && !loading) {
      const foundPackage = packages.length > 0

      if (foundPackage) {
        const { id, order_status } = await packages[0]
        // eslint-disable-next-line camelcase
        switch (order_status) {
          case 'ready':
            history.push(`/delivery/${id}`)
            break
          case 'collected':
            history.push(`/delivery/${id}`)
            break
          case 'in_travel':
            history.push(`/delivery/${id}`)
            break
          case 'destination_reached':
            history.push(`/confirm/${id}`)
            break
          default:
            alert('el paquete ya fue entregado')
            break
        }
      } else {
        alert('el paquete no existe')
      }
    }
  }

  return (
    <Layout
      headerTitle="Hola!"
      headerSubtitle="Ingresa tu número de boleta"
      DontForgetModal={
        <Modal isOpen={isModalOpen} handleClick={() => changeIsModalOpen(false)} actionText="Entendido">
          <img src={warning} alt="Warning" />
          <Text as="h1" color="primary" small>
            Antes de recibir...
          </Text>
          <Text color="danger">
            No olvides confirmar la recepción de este envío al final de este proceso ingresando:
          </Text>
          <Text as="ul" color="primary" bold>
            <li>Nombre</li>
            <li>RUT</li>
            <li>Celular</li>
          </Text>
        </Modal>
      }
    >
      <div className="check-ticket">
        <TextHandlerColorMobile color="secondary" bold uppercase>
          Confirmar n° boleta o pedido
        </TextHandlerColorMobile>
        <Form formData={setPackageCode} onSubmit={e => toDelivery(e)}>
          {({ handleFormChange, value }) => (
            <>
              <FormInput
                width="10"
                placeholder="Ingresa aquí..."
                name="packageCode"
                value={value}
                onChange={handleFormChange}
              />
            </>
          )}
        </Form>
      </div>
    </Layout>
  )
}

export default Check
