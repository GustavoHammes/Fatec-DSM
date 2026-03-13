import pandas as pd

# 1. Criamos uma função que automatiza todo o processo
def gerar_tabela_frequencia(dados_brutos):
    # Transforma a lista bruta em uma estrutura do Pandas
    df_bruto = pd.Series(dados_brutos)
    
    # Conta quantas vezes cada número aparece (Fi) e ordena do menor para o maior
    tabela = df_bruto.value_counts().sort_index().reset_index()
    tabela.columns = ['Dados', 'Fi'] # Renomeia as colunas
    
    # 2. Calcula as colunas acumuladas e porcentagens
    tabela['Fa'] = tabela['Fi'].cumsum()
    
    total_dados = tabela['Fi'].sum()
    tabela['Fr(%)'] = (tabela['Fi'] / total_dados) * 100
    
    tabela['Fra(%)'] = tabela['Fr(%)'].cumsum()
    
    # Arredondando as porcentagens para 0 casas decimais para ficar igual ao seu Excel
    tabela['Fr(%)'] = tabela['Fr(%)'].round(0).astype(int)
    tabela['Fra(%)'] = tabela['Fra(%)'].round(0).astype(int)
    
    return tabela

# ==========================================
# 3. Inserindo os dados brutos (copiados da sua imagem)
# ==========================================

dados_ex01 = [
    84,68,33,52,47,73,68,61,73,77,74,71,81,91,65,55,57,35,85,88,59,80,41,50,53,65,76,85,73,60,67,41,78,56,94,35,45,55,64,74,65,94,66,48,39,69,89,98,42,54
]

dados_ex02 = [
    6,5,2,6,4,3,6,2,6,5,1,6,3,3,5,1,3,6,3,4,5,4,3,1,3,5,4,4,2,6,2,2,5,2,5,1,3,6,5,1,5,6,2,4,6,1,5,2,4,3
]

dados_ex03 = [
    64,78,66,82,74,103,78,86,103,87,73,95,82,89,73,92,85,80,81,90,78,86,78,101,85,98,75,73,90,86,86,84,86,76,76,83,103,86,84,85,76,80,92,102,73,87,70,85,79,93,82,90,83,81,85,72,81,96,81,85,68,96,86,70,72,74,84,99,81,89,71,73,63,105,74,98,78,78,83,96,95,94,88,62,91,83,98,93,83,76,94,75,67,95,108,98,71,92,72,73
]

dados_ex04 = [
    14,12,11,13,14,13,12,14,13,14,11,12,12,14,10,13,15,11,15,13,16,17,14,14
]


# ==========================================
# 4. Exibindo os resultados
# ==========================================

print("--- TABELA EX 01 ---")
# to_string(index=False) remove a primeira coluna de índices do Pandas para ficar igual sua imagem
print(gerar_tabela_frequencia(dados_ex01).to_string(index=False)) 

print("\n--- TABELA EX 02 ---")
print(gerar_tabela_frequencia(dados_ex02).to_string(index=False))

print("\n--- TABELA EX 03 ---")
print(gerar_tabela_frequencia(dados_ex03).to_string(index=False))

print("\n--- TABELA EX 04 ---")
print(gerar_tabela_frequencia(dados_ex04).to_string(index=False))