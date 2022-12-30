import { login } from "./utils";
import "./index.css";
import { useState } from "react";
import { useEffect } from "react";

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [email, SetEmail] = useState("");
  const [senha, SetSenha] = useState("");
  const [onSubmit, SetOnsubmit] = useState(true);

  const [ifError, setIerror] = useState(false);

  useEffect(() => {
    if (email === "" || senha.length <= 5) {
      SetOnsubmit(true);
    } else {
      SetOnsubmit(false);
    }
  }, [email, senha]);

  function Submit() {
    setIerror(false);

    if (email === "" || senha.length <= 5) {
      alert("preencha todos os campos primeiro");
      SetOnsubmit(true);
      return;
    }

    SetOnsubmit(true);

    login(email, senha)
      .catch((response) => StartError(response.message))
      .then((response) => StartError(response?.message))
      .then(() => SetOnsubmit(false));
  }

  function StartError(e) {
    if (e !== "sucesso") {
      setIerror(true);
      return;
    }

    alert("sucesso");
    return;
  }

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {ifError === true ? (
          <div className="errorMessage">Erro no login</div>
        ) : null}

        <div className="row">
          <label htmlFor={"email"}>Email</label>
          <input
            value={email}
            id={"email"}
            type={"email"}
            autoComplete="off"
            onChange={(e) => SetEmail(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor={"password"}>Password</label>
          <input
            value={senha}
            id={"password"}
            type={"password"}
            onChange={(e) => SetSenha(e.target.value)}
          />
        </div>

        <div className="button" onClick={Submit}>
          <button disabled={onSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
}
