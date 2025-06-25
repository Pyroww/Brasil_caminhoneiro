// Dados globais
let exports = [
  {
    id: "EXP001",
    cliente: "Frigorífico ABC",
    tipoCarne: "Bovina",
    quantidade: 500,
    peso: 12000,
    origem: "São Paulo",
    destino: "Rio de Janeiro",
    motorista: "João Silva",
    status: "Ativo",
    placaCaminhao: "ABC-1234",
    temperatura: "Congelado (-18°C)",
    dataColeta: "2024-01-15",
    dataEntrega: "2024-01-17",
    idadeMotorista: 45,
    dataValidade: "2024-02-15",
  },
  {
    id: "EXP002",
    cliente: "Carnes Premium",
    tipoCarne: "Suína",
    quantidade: 300,
    peso: 8500,
    origem: "Minas Gerais",
    destino: "Espírito Santo",
    motorista: "Maria Santos",
    status: "Concluído",
    placaCaminhao: "DEF-5678",
    temperatura: "Refrigerado (0°C a 4°C)",
    dataColeta: "2024-01-10",
    dataEntrega: "2024-01-12",
    idadeMotorista: 38,
    dataValidade: "2024-02-10",
  },
]

let currentStep = 1
let editingExportId = null

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado!")
  loadExportsFromStorage()
  initializePage()
})

// Carregar dados do localStorage
function loadExportsFromStorage() {
  try {
    const storedExports = localStorage.getItem("loudfat-exports")
    if (storedExports) {
      exports = JSON.parse(storedExports)
      console.log("Dados carregados do localStorage:", exports)
    }
  } catch (error) {
    console.error("Erro ao carregar dados do localStorage:", error)
  }
}

// Salvar dados no localStorage
function saveExportsToStorage() {
  try {
    localStorage.setItem("loudfat-exports", JSON.stringify(exports))
    console.log("Dados salvos no localStorage")
  } catch (error) {
    console.error("Erro ao salvar dados no localStorage:", error)
  }
}

// Inicializar página baseada na URL
function initializePage() {
  const currentPage = window.location.pathname
  console.log("Página atual:", currentPage)

  if (currentPage.includes("index.html") || currentPage === "/" || currentPage.endsWith("/")) {
    console.log("Inicializando página de login")
    initLoginPage()
  } else if (currentPage.includes("dashboard.html")) {
    console.log("Inicializando dashboard")
    initDashboardPage()
  } else if (currentPage.includes("export-details.html")) {
    console.log("Inicializando página de detalhes")
    initExportDetailsPage()
  }
}

// === LOGIN PAGE ===
function initLoginPage() {
  console.log("Configurando página de login")
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    console.log("Formulário de login encontrado")
    loginForm.addEventListener("submit", handleLogin)
  } else {
    console.error("Formulário de login não encontrado!")
  }
}

function handleLogin(e) {
  e.preventDefault()
  console.log("Tentativa de login")

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  console.log("Usuário:", username, "Senha:", password ? "***" : "vazio")

  if (username && password) {
    console.log("Credenciais válidas, redirecionando...")
    // Usar caminho relativo
    window.location.href = "./dashboard.html"
  } else {
    alert("Por favor, preencha todos os campos.")
  }
}

// === DASHBOARD PAGE ===
function initDashboardPage() {
  console.log("Inicializando dashboard")
  renderExportsTable()
  setupDashboardEventListeners()
}

function setupDashboardEventListeners() {
  // Botões principais
  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      console.log("Logout clicado")
      window.location.href = "./index.html"
    })
  }

  const backBtn = document.getElementById("backBtn")
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      console.log("Voltar clicado")
      window.location.href = "./index.html"
    })
  }

  const newExportBtn = document.getElementById("newExportBtn")
  if (newExportBtn) {
    newExportBtn.addEventListener("click", () => {
      console.log("Nova exportação clicada")
      openNewExportModal()
    })
  }

  // Modal events
  setupModalEventListeners()
}

function setupModalEventListeners() {
  // Close modals
  const closeModal = document.getElementById("closeModal")
  if (closeModal) {
    closeModal.addEventListener("click", closeNewExportModal)
  }

  const closeConfirmModal = document.getElementById("closeConfirmModal")
  if (closeConfirmModal) {
    closeConfirmModal.addEventListener("click", closeConfirmModal)
  }

  const closeReportModal = document.getElementById("closeReportModal")
  if (closeReportModal) {
    closeReportModal.addEventListener("click", closeReportModal)
  }

  const closeDeleteModal = document.getElementById("closeDeleteModal")
  if (closeDeleteModal) {
    closeDeleteModal.addEventListener("click", closeDeleteModal)
  }

  // Step navigation
  const nextBtn = document.getElementById("nextBtn")
  if (nextBtn) {
    nextBtn.addEventListener("click", handleNextStep)
  }

  const prevBtn = document.getElementById("prevBtn")
  if (prevBtn) {
    prevBtn.addEventListener("click", handlePrevStep)
  }

  // Confirm actions
  const confirmYes = document.getElementById("confirmYes")
  if (confirmYes) {
    confirmYes.addEventListener("click", handleConfirmSubmit)
  }

  const confirmNo = document.getElementById("confirmNo")
  if (confirmNo) {
    confirmNo.addEventListener("click", closeConfirmModal)
  }

  const deleteYes = document.getElementById("deleteYes")
  if (deleteYes) {
    deleteYes.addEventListener("click", handleConfirmDelete)
  }

  const deleteNo = document.getElementById("deleteNo")
  if (deleteNo) {
    deleteNo.addEventListener("click", closeDeleteModal)
  }

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.classList.remove("show")
    }
  })
}

function renderExportsTable() {
  const tbody = document.getElementById("exportsTableBody")
  if (!tbody) {
    console.error("Tabela de exportações não encontrada!")
    return
  }

  console.log("Renderizando tabela com", exports.length, "exportações")
  tbody.innerHTML = ""

  exports.forEach((exportItem) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${exportItem.cliente}</td>
            <td>${exportItem.tipoCarne}</td>
            <td>${exportItem.quantidade}</td>
            <td>${exportItem.peso.toLocaleString()}</td>
            <td>${exportItem.origem} → ${exportItem.destino}</td>
            <td>${exportItem.motorista}</td>
            <td><span class="status-badge status-${getStatusClass(exportItem.status)}">${exportItem.status}</span></td>
            <td>
                <div class="actions">
                    <button class="action-btn" onclick="openReportModal()" title="Relatório">📊</button>
                    <button class="action-btn" onclick="editExport('${exportItem.id}')" title="Editar">✏️</button>
                    <button class="action-btn" onclick="openDeleteModal('${exportItem.id}')" title="Excluir">🗑️</button>
                </div>
            </td>
        `

    // Add click event to row (excluding action buttons)
    row.addEventListener("click", (e) => {
      if (!e.target.closest(".actions")) {
        viewExportDetails(exportItem.id)
      }
    })

    tbody.appendChild(row)
  })
}

function getStatusClass(status) {
  switch (status) {
    case "Ativo":
      return "active"
    case "Concluído":
      return "completed"
    case "Pendente":
      return "pending"
    default:
      return "active"
  }
}

function viewExportDetails(exportId) {
  console.log("Visualizando detalhes da exportação:", exportId)
  window.location.href = `./export-details.html?id=${exportId}`
}

// === MODAL FUNCTIONS ===
function openNewExportModal(exportId = null) {
  editingExportId = exportId
  currentStep = 1

  const modal = document.getElementById("newExportModal")
  const title = document.getElementById("modalTitle")

  if (exportId) {
    title.textContent = "Editar Exportação"
    populateFormWithExportData(exportId)
  } else {
    title.textContent = "Nova Exportação"
    clearForm()
  }

  updateStepDisplay()
  modal.classList.add("show")
}

function closeNewExportModal() {
  const modal = document.getElementById("newExportModal")
  if (modal) {
    modal.classList.remove("show")
  }
  editingExportId = null
  currentStep = 1
  clearForm()
}

function openConfirmModal() {
  const modal = document.getElementById("confirmModal")
  if (modal) {
    modal.classList.add("show")
  }
}

function closeConfirmModal() {
  const modal = document.getElementById("confirmModal")
  if (modal) {
    modal.classList.remove("show")
  }
}

function openReportModal() {
  const modal = document.getElementById("reportModal")
  if (modal) {
    modal.classList.add("show")
  }
}

function closeReportModal() {
  const modal = document.getElementById("reportModal")
  if (modal) {
    modal.classList.remove("show")
  }
}

function openDeleteModal(exportId) {
  window.deleteExportId = exportId
  const modal = document.getElementById("deleteModal")
  if (modal) {
    modal.classList.add("show")
  }
}

function closeDeleteModal() {
  const modal = document.getElementById("deleteModal")
  if (modal) {
    modal.classList.remove("show")
  }
  window.deleteExportId = null
}

// === FORM FUNCTIONS ===
function handleNextStep() {
  if (!validateCurrentStep()) {
    alert("Por favor, preencha todos os campos obrigatórios antes de continuar.")
    return
  }

  if (currentStep < 3) {
    currentStep++
    updateStepDisplay()
  } else {
    openConfirmModal()
  }
}

function handlePrevStep() {
  if (currentStep > 1) {
    currentStep--
    updateStepDisplay()
  }
}

function updateStepDisplay() {
  // Update step buttons
  document.querySelectorAll(".step-btn").forEach((btn, index) => {
    btn.classList.toggle("active", index + 1 === currentStep)
  })

  // Update step content
  document.querySelectorAll(".step-content").forEach((content, index) => {
    content.classList.toggle("active", index + 1 === currentStep)
  })

  // Update navigation buttons
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")

  if (prevBtn) {
    prevBtn.style.display = currentStep > 1 ? "block" : "none"
  }

  if (nextBtn) {
    nextBtn.textContent = currentStep === 3 ? (editingExportId ? "Salvar alterações" : "Criar exportação") : "Próximo"
  }
}

function validateCurrentStep() {
  const requiredFields = getRequiredFieldsForStep(currentStep)
  return requiredFields.every((fieldId) => {
    const field = document.getElementById(fieldId)
    return field && field.value.trim() !== ""
  })
}

function getRequiredFieldsForStep(step) {
  switch (step) {
    case 1:
      return ["cliente", "tipoCarne", "quantidade", "peso"]
    case 2:
      return ["motorista", "idadeMotorista", "placaCaminhao", "temperatura"]
    case 3:
      return ["origem", "destino", "dataColeta", "dataEntrega", "dataValidade"]
    default:
      return []
  }
}

function handleConfirmSubmit() {
  const formData = getFormData()

  if (editingExportId) {
    updateExport(editingExportId, formData)
  } else {
    addNewExport(formData)
  }

  closeConfirmModal()
  closeNewExportModal()
  renderExportsTable()
}

function getFormData() {
  return {
    cliente: document.getElementById("cliente").value,
    tipoCarne: document.getElementById("tipoCarne").value,
    quantidade: Number.parseInt(document.getElementById("quantidade").value),
    peso: Number.parseInt(document.getElementById("peso").value),
    motorista: document.getElementById("motorista").value,
    idadeMotorista: Number.parseInt(document.getElementById("idadeMotorista").value),
    placaCaminhao: document.getElementById("placaCaminhao").value,
    temperatura: document.getElementById("temperatura").value,
    origem: document.getElementById("origem").value,
    destino: document.getElementById("destino").value,
    dataColeta: document.getElementById("dataColeta").value,
    dataEntrega: document.getElementById("dataEntrega").value,
    dataValidade: document.getElementById("dataValidade").value,
    status: "Ativo",
  }
}

function addNewExport(formData) {
  const newId = `EXP${String(exports.length + 1).padStart(3, "0")}`
  const newExport = { ...formData, id: newId }
  exports.push(newExport)
  saveExportsToStorage()
}

function updateExport(exportId, formData) {
  const index = exports.findIndex((exp) => exp.id === exportId)
  if (index !== -1) {
    exports[index] = { ...formData, id: exportId }
    saveExportsToStorage()
  }
}

function editExport(exportId) {
  openNewExportModal(exportId)
}

function populateFormWithExportData(exportId) {
  const exportData = exports.find((exp) => exp.id === exportId)
  if (!exportData) return

  document.getElementById("cliente").value = exportData.cliente || ""
  document.getElementById("tipoCarne").value = exportData.tipoCarne || ""
  document.getElementById("quantidade").value = exportData.quantidade || ""
  document.getElementById("peso").value = exportData.peso || ""
  document.getElementById("motorista").value = exportData.motorista || ""
  document.getElementById("idadeMotorista").value = exportData.idadeMotorista || ""
  document.getElementById("placaCaminhao").value = exportData.placaCaminhao || ""
  document.getElementById("temperatura").value = exportData.temperatura || ""
  document.getElementById("origem").value = exportData.origem || ""
  document.getElementById("destino").value = exportData.destino || ""
  document.getElementById("dataColeta").value = exportData.dataColeta || ""
  document.getElementById("dataEntrega").value = exportData.dataEntrega || ""
  document.getElementById("dataValidade").value = exportData.dataValidade || ""
}

function clearForm() {
  const form = document.getElementById("exportForm")
  if (form) {
    form.reset()
  }
}

function handleConfirmDelete() {
  if (window.deleteExportId) {
    deleteExport(window.deleteExportId)
    closeDeleteModal()
    renderExportsTable()
  }
}

function deleteExport(exportId) {
  exports = exports.filter((exp) => exp.id !== exportId)
  saveExportsToStorage()
}

// === EXPORT DETAILS PAGE ===
function initExportDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search)
  const exportId = urlParams.get("id")

  console.log("ID da exportação:", exportId)

  if (exportId) {
    loadExportDetails(exportId)
  }

  setupExportDetailsEventListeners()
}

function setupExportDetailsEventListeners() {
  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "./index.html"
    })
  }

  const backBtn = document.getElementById("backBtn")
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "./dashboard.html"
    })
  }

  const concludeBtn = document.getElementById("concludeBtn")
  if (concludeBtn) {
    concludeBtn.addEventListener("click", handleConcludeExport)
  }
}

function loadExportDetails(exportId) {
  const exportData = exports.find((exp) => exp.id === exportId)

  if (!exportData) {
    alert("Exportação não encontrada!")
    window.location.href = "./dashboard.html"
    return
  }

  console.log("Dados da exportação:", exportData)

  // Update page title
  const exportTitle = document.getElementById("exportTitle")
  if (exportTitle) {
    exportTitle.textContent = `Exportação ID identificador: ${exportData.id}`
  }

  // Update route info
  const routeInfo = document.getElementById("routeInfo")
  if (routeInfo) {
    routeInfo.textContent = `${exportData.origem} → ${exportData.destino}`
  }

  // Update responsible data
  const responsavelNome = document.getElementById("responsavelNome")
  if (responsavelNome) {
    responsavelNome.textContent = exportData.motorista
  }

  const responsavelIdade = document.getElementById("responsavelIdade")
  if (responsavelIdade) {
    responsavelIdade.textContent = `${exportData.idadeMotorista} anos`
  }

  const responsavelPlaca = document.getElementById("responsavelPlaca")
  if (responsavelPlaca) {
    responsavelPlaca.textContent = exportData.placaCaminhao
  }

  // Update export data
  const dataInicio = document.getElementById("dataInicio")
  if (dataInicio) {
    dataInicio.textContent = formatDate(exportData.dataColeta)
  }

  const quantidadePecas = document.getElementById("quantidadePecas")
  if (quantidadePecas) {
    quantidadePecas.textContent = exportData.quantidade
  }

  const dataPrevista = document.getElementById("dataPrevista")
  if (dataPrevista) {
    dataPrevista.textContent = formatDate(exportData.dataEntrega)
  }

  const tipoCorte = document.getElementById("tipoCorte")
  if (tipoCorte) {
    tipoCorte.textContent = exportData.tipoCarne
  }

  const placaCaminhao = document.getElementById("placaCaminhao")
  if (placaCaminhao) {
    placaCaminhao.textContent = exportData.placaCaminhao
  }

  const dataValidade = document.getElementById("dataValidade")
  if (dataValidade) {
    dataValidade.textContent = formatDate(exportData.dataValidade)
  }

  const tipoCarga = document.getElementById("tipoCarga")
  if (tipoCarga) {
    tipoCarga.textContent = exportData.temperatura
  }

  const idEntrega = document.getElementById("idEntrega")
  if (idEntrega) {
    idEntrega.textContent = `ENT-${exportData.id}`
  }

  const pesoCarga = document.getElementById("pesoCarga")
  if (pesoCarga) {
    pesoCarga.textContent = `${exportData.peso.toLocaleString()} kg`
  }

  // Update conclude button
  const concludeBtn = document.getElementById("concludeBtn")
  if (concludeBtn && exportData.status === "Concluído") {
    concludeBtn.textContent = "Exportação Concluída"
    concludeBtn.disabled = true
  }

  // Store current export ID for conclude function
  window.currentExportId = exportId
}

function handleConcludeExport() {
  if (window.currentExportId) {
    const exportIndex = exports.findIndex((exp) => exp.id === window.currentExportId)
    if (exportIndex !== -1) {
      exports[exportIndex].status = "Concluído"
      saveExportsToStorage()

      // Update button
      const concludeBtn = document.getElementById("concludeBtn")
      if (concludeBtn) {
        concludeBtn.textContent = "Exportação Concluída"
        concludeBtn.disabled = true
      }

      alert("Exportação concluída com sucesso!")
    }
  }
}

function formatDate(dateString) {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}














// Global functions for onclick events
window.openReportModal = openReportModal
window.editExport = editExport
window.openDeleteModal = openDeleteModal
window.viewExportDetails = viewExportDetails




