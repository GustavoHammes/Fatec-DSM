def resolver_exercicio():
    print("\n" + "="*30)
    print("SISTEMA DE RESOLUÇÃO: Σ e Π")
    print("="*30)
    
    tipo = input("O que deseja calcular? (S para Somatório / P para Produtório): ").strip().upper()
    inicio = int(input("Valor inicial (i): "))
    fim = int(input("Valor final (n): "))
    expressao = input("Digite a expressão (ex: i, i**2, 2*i, i+2): ")

    passos = []
    if tipo == 'S':
        resultado = 0
        operador_nome = "Somatório (Σ)"
    else:
        resultado = 1
        operador_nome = "Produtório (Π)"

    print(f"\n--- Iniciando cálculo do {operador_nome} ---")
    
    for i in range(inicio, fim + 1):
        # Avalia a expressão matematicamente
        valor_atual = eval(expressao, {"i": i})
        
        if tipo == 'S':
            resultado += valor_atual
        else:
            resultado *= valor_atual
            
        # Monta a string do passo a passo
        detalhe = f"i={i} -> {expressao.replace('i', str(i))} = {valor_atual}"
        passos.append(str(valor_atual))
        print(detalhe)

    print("-" * 30)
    simbolo = " + " if tipo == 'S' else " * "
    print(f"Expressão final: {simbolo.join(passos)}")
    print(f"RESULTADO FINAL: {resultado}")
    print("-" * 30)

# Loop para você resolver a lista toda de uma vez
while True:
    resolver_exercicio()
    continuar = input("\nDeseja resolver outro? (s/n): ").strip().lower()
    if continuar != 's':
        print("Boa sorte nos estudos, Gustavo!")
        break