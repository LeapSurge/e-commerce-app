import { Button, List, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementItemQuantity,
  incrementItemQuantity,
  removeItemFromCart,
} from "../store/slice/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  return (
    <List
      className="cart-list"
      dataSource={cartItems}
      renderItem={(item) => (
        <List.Item
          actions={[
            <div>
              <Button
                onClick={() => dispatch(decrementItemQuantity(item.skuId))}
              >
                -
              </Button>
              <span>{item.quantity}</span>
              <Button
                onClick={() => dispatch(incrementItemQuantity(item.skuId))}
              >
                +
              </Button>
            </div>,
            <Button
              color="danger"
              variant="solid"
              onClick={() => dispatch(removeItemFromCart(item.skuId))}
            >
              删除
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={item.productName}
            avatar={<Avatar src={item.image} shape="square" size={64} />}
            description={
              <Button color="cyan" variant="dashed">
                {item.specs}
              </Button>
            }
          />
          <div>{item.price}</div>
        </List.Item>
      )}
      footer={<div style={{ textAlign: "right" }}>总计：{totalAmount}</div>}
    />
  );
}
