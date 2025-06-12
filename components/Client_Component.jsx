import App_Context from "@/store/App_Context";

export default function Client_Component({ children }) {
  return <App_Context>{children}</App_Context>;
}
