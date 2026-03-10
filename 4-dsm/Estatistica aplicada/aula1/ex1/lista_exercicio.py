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
    5, 4, 6, 1, 2, 5, 3, 1, 3, 3,
    4, 4, 1, 5, 5, 6, 1, 2, 5, 1,
    3, 4, 5, 1, 1, 6, 6, 2, 1, 1,
    4, 4, 4, 3, 4, 3, 2, 2, 2, 3,
    6, 6, 3, 2, 4, 2, 6, 6, 2, 1
]

dados_ex02 = [
    144, 152, 159, 160,
    160, 151, 157, 160,
    154, 145, 151, 146,
    142, 146, 142, 150,
    141, 150, 143, 141
]

dados_ex03 = [
    151, 152, 154, 155, 158, 159, 159, 160, 161, 161,
    161, 162, 163, 163, 163, 164, 165, 165, 165, 166,
    166, 166, 166, 167, 167, 167, 167, 167, 168, 168,
    168, 168, 168, 168, 168, 168, 168, 168,169,169,169,169,169,169,170,170,170,170,170, 170, 170, 170, 171, 171, 171, 172, 172, 172, 172, 173,
    173, 173, 174, 174, 174, 175, 175, 175, 175, 176,
    176, 176, 176, 177, 177, 177, 177, 178, 178, 178,
    179, 179, 180, 180, 180, 180,181, 181, 181, 182, 182, 182, 183, 184, 185, 186, 187, 188, 190, 190
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