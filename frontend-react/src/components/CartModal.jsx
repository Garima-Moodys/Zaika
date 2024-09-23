import { Modal, Button } from "@passfort/castle";
import { Text } from "@passfort/castle";

export default function CardModal({items,isOpen,onClose}){

    return <Modal
    title="Your Cart"
    isOpen={isOpen}
    onClose={onClose}
    renderFooter={() =>
      items.length === 0 ? "" : <Button label="Checkout" type="primary" />
    }
  >
    <Text>
      <table>
        
      </table>
    </Text>
  </Modal>
}