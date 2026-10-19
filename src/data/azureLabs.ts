export const azureLabs = {
  '002': {
    slug: '002-azure-application-gateway', module: 'M5',
    images: ['e01-backend-health.png', 'e02-backend-vm2.png', 'e03-backend-vm1.png'],
    code: `resource vnet 'Microsoft.Network/virtualNetworks@2020-06-01' existing = {
  name: virtualNetworkName
}
resource backendSubnet 'Microsoft.Network/virtualNetworks/subnets@2020-06-01' existing = {
  parent: vnet
  name: subnet2Name
}
// NIC subnet reference:
// id: backendSubnet.id`,
    references: [{ label: 'Microsoft Learn · Bicep existing resources', url: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/existing-resource' }],
    es: {
      title: 'Application Gateway con dos servidores IIS', date: '28 de septiembre de 2026',
      summary: 'Adaptación de Bicep a una red existente, selección de tamaño de VM y validación de dos servidores web detrás de un único punto de entrada.',
      outcome: 'Ambos backends aparecen Healthy con HTTP 200. Mis capturas muestran respuestas de BackendVM1 y BackendVM2. No realicé una prueba de caída.',
      context: 'Retomé el laboratorio M5 con ContosoVnet, sus subredes y ContosoAppGateway ya desplegados. Mi objetivo era incorporar dos VM con IIS sin volver a gestionar la configuración de esa red.',
      diagram: `Cliente HTTP → frontend público → ContosoAppGateway
ContosoVnet
  AGSubnet → Application Gateway → listener / regla → BackendPool
  BackendSubnet
    ├─ BackendVM1 · 10.0.1.4 · IIS :80
    └─ BackendVM2 · 10.0.1.5 · IIS :80`,
      architectureNote: 'El cliente accedía a una única IP pública del Gateway. Registré como destinos del pool las IP privadas de las VM. Las direcciones del diagrama son las de este laboratorio; no son endpoints actuales para probar.',
      decisions: [
        { title: 'Reutilizar la red con existing', text: 'Conservé los archivos originales y creé aparte main.Juan-existing-network.bicep. Declaré la VNet y BackendSubnet como recursos existing, y las NIC usan backendSubnet.id. El archivo corregido mantiene dos VM, dos NIC y dos extensiones IIS; no declara un nuevo Application Gateway.' },
        { title: 'Adaptar el tamaño a las restricciones disponibles', text: 'En el archivo de parámetros corregido usé Standard_D2s_v7, admitido por la plantilla, en lugar de D2s_v5, por las restricciones de SKU y cuota de mi suscripción. Esto no significa que todas las cuentas Free tengan la misma cuota ni que ese tamaño esté disponible hoy.' },
        { title: 'Validar antes de desplegar', text: 'Antes de desplegar compilé la plantilla, la validé en Cloud Shell y ejecuté un What-If: seis creaciones y tres recursos ignorados, sin modificaciones ni eliminaciones. Después hice un despliegue incremental que terminó con éxito.' },
        { title: 'Registrar explícitamente los destinos', text: 'Tras crear las VM, el BackendPool no tenía destinos, así que añadí 10.0.1.4 y 10.0.1.5. Crear una VM dentro de la VNet no la incorpora automáticamente al pool.' }
      ],
      codeTitle: 'Fragmento de la plantilla corregida', codeNote: 'Extracto explicativo, comprobado contra mi archivo local. No es una plantilla completa ni incluye credenciales.',
      checks: [
        ['Referencia de red', 'existing en VNet y subred', 'Comprobado en mi archivo local; sin consulta al estado actual de Azure.'],
        ['Despliegue', 'Succeeded', 'Resultado registrado en su momento; no es una prueba nueva ni evidencia de que los recursos sigan activos.'],
        ['Salud de backend', '2/2 Healthy; HTTP 200; puerto 80', 'Captura original E01: conectividad y respuesta del servicio en ese momento.'],
        ['Acceso a la aplicación', 'BackendVM2 y BackendVM1', 'E02/E03 muestran ambos nombres; no prueban reparto 50/50 ni failover.']
      ],
      captions: ['E01 · Dos destinos Healthy; ambos recibieron código 200 por HTTP/80. Se excluyó la cabecera de cuenta.', 'E02 · Respuesta de BackendVM2. El recorte conserva el cuerpo; la URL original queda fuera de la copia pública.', 'E03 · Respuesta de BackendVM1. El vínculo con el mismo frontend consta en mis capturas originales, no en este recorte.'],
      limits: ['Usé HTTP. No configuré ni validé HTTPS, certificados o WAF en este caso.', 'No detuve IIS ni simulé la caída de una VM: no afirmo failover probado.', 'Dos respuestas distintas no prueban distribución uniforme, tolerancia a fallos zonales ni sincronización de datos o sesiones.', 'Los recursos ya no están desplegados: los eliminé al terminar el laboratorio, así que no volví a probar estos endpoints.'],
      lesson: 'Separar la infraestructura existente de los recursos nuevos, revisar el cambio previsto y validar tanto las sondas como la respuesta que recibe el usuario.',
      provenance: 'Basado en el laboratorio AZ-700 (módulo M5) de Microsoft Learn. Usé asistentes de IA como guía para la adaptación y el troubleshooting. Las capturas y los archivos son míos; evidencia del 28 de septiembre de 2026.'
    },
    en: {
      title: 'Application Gateway with two IIS backends', date: '28 September 2026',
      summary: 'Adapting Bicep to an existing network, selecting a VM size and validating two web servers behind a single entry point.',
      outcome: 'Both backends show Healthy with HTTP 200. My screenshots show responses from BackendVM1 and BackendVM2. I did not run a failure test.',
      context: 'I resumed the M5 lab with ContosoVnet, its subnets and ContosoAppGateway already deployed. My goal was to add two IIS VMs without managing the existing network configuration again.',
      diagram: `HTTP client → public frontend → ContosoAppGateway
ContosoVnet
  AGSubnet → Application Gateway → listener / rule → BackendPool
  BackendSubnet
    ├─ BackendVM1 · 10.0.1.4 · IIS :80
    └─ BackendVM2 · 10.0.1.5 · IIS :80`,
      architectureNote: 'The client used one public Gateway IP. I registered the private VM addresses as backend targets. Diagram addresses belong to this lab; they are not current endpoints to test.',
      decisions: [
        { title: 'Reference the network with existing', text: 'I preserved the originals and created main.Juan-existing-network.bicep separately. I declared the VNet and BackendSubnet with existing, and the NICs reference backendSubnet.id. The corrected file retains two VMs, two NICs and two IIS extensions; it does not declare a new Application Gateway.' },
        { title: 'Adapt the VM size to available constraints', text: 'In the corrected parameter file I used Standard_D2s_v7, supported by the template, instead of D2s_v5, because of SKU/quota constraints in my subscription. This does not establish a universal Free-account quota or current availability of that size.' },
        { title: 'Validate before deployment', text: 'Before deploying I compiled the template, validated it in Cloud Shell and ran a What-If: six creates and three ignored resources, with no modifications or deletions. I then ran an incremental deployment, which succeeded.' },
        { title: 'Register backend targets explicitly', text: 'After VM creation, BackendPool still had no targets, so I added 10.0.1.4 and 10.0.1.5. Creating a VM in the VNet does not automatically register it in the pool.' }
      ],
      codeTitle: 'Excerpt from the corrected template', codeNote: 'Illustrative excerpt checked against my local file. It is not a complete deployment template and contains no credentials.',
      checks: [
        ['Network reference', 'existing VNet and subnet', 'Verified in my local file; no current Azure-state query.'],
        ['Deployment', 'Succeeded', 'Result recorded at the time; not a fresh test or evidence that resources are still running.'],
        ['Backend health', '2/2 Healthy; HTTP 200; port 80', 'Original E01 screenshot establishes service response at that time.'],
        ['Application access', 'BackendVM2 and BackendVM1', 'E02/E03 show both names; not a 50/50 distribution or failover test.']
      ],
      captions: ['E01 · Two Healthy targets; both received status 200 over HTTP/80. Account header excluded.', 'E02 · BackendVM2 response. The crop retains the body; the original URL is outside the public copy.', 'E03 · BackendVM1 response. The shared frontend appears in my original screenshots, not in this crop.'],
      limits: ['I used HTTP. I did not configure or validate HTTPS, certificates or WAF in this case.', 'I did not stop IIS or simulate a VM failure: tested failover is not claimed.', 'Two different responses do not establish uniform distribution, zone-failure resilience or synchronized application data/sessions.', 'The resources are no longer deployed: I deleted them when I finished the lab, so I did not re-test these endpoints.'],
      lesson: 'Separate existing infrastructure from new resources, review the planned changes, and validate both probes and the user-facing response.',
      provenance: 'Based on the Microsoft Learn AZ-700 lab (module M5). I used AI assistants as a guide for adaptation and troubleshooting. Screenshots and files are my own; evidence dated 28 September 2026.'
    }
  },
  '003': {
    slug: '003-azure-internal-load-balancer', module: 'M4',
    images: ['e01-unhealthy.png','e02-extension-error.png','e03-iis-repair.png','e04-healthy.png','e05-client-responses.png'],
    code: `1..15 | ForEach-Object {
    curl.exe -s --no-keepalive http://10.1.2.4
}`,
    references: [{ label: 'Microsoft Learn · Azure Load Balancer algorithm', url: 'https://learn.microsoft.com/en-us/azure/load-balancer/concepts' }],
    es: {
      title: 'Recuperación de un Load Balancer interno', date: '19 de septiembre de 2026',
      summary: 'Diagnóstico de un timeout: de tres backends no saludables a respuestas verificadas de tres servidores IIS a través de una IP privada.',
      outcome: 'Las capturas muestran el cambio de 0% a 100% de instancias saludables y una prueba desde myTestVM que devuelve myVM1, myVM2 y myVM3.',
      context: 'El laboratorio M4 utilizó un Azure Load Balancer Standard interno, tres VM backend y una VM cliente. Partí de un despliegue que había adaptado parcialmente con ayuda de IA, pero mi prueba a la IP privada terminaba en timeout.',
      diagram: `myTestVM → 10.1.2.4:80 → myIntLoadBalancer (interno)
                       → regla TCP/80 → backend pool
                           ├─ myVM1 · 10.1.0.5 · IIS
                           ├─ myVM2 · 10.1.0.6 · IIS
                           └─ myVM3 · 10.1.0.4 · IIS
Administración: Azure Bastion / Run Command`,
      architectureNote: 'La VIP privada 10.1.2.4 era el punto de entrada del servicio, no la dirección de una VM. La asignación VM/IP procede de la captura de salud. El cliente de la prueba estaba dentro del entorno de red.',
      decisions: [
        { title: 'Separar fallo de aplicación y fallo de balanceador', text: 'El panel mostraba tres destinos Down y timeout del probe. La extensión VMConfig de myVM1 mostraba Provisioning failed: no pudo descargar install-iis.ps1 desde raw.githubusercontent.com. Esa captura identifica un fallo de la dependencia de instalación; no determina qué ruta, firewall o mecanismo de salida lo causó.' },
        { title: 'Reparar IIS antes de recrear infraestructura', text: 'Usé Run Command para instalar Web-Server y escribir el nombre de cada VM en su página inicial. Comprobé primero una reparación y después apliqué las restantes. Mis capturas conservan la ejecución satisfactoria y la recuperación a tres destinos Up.' },
        { title: 'Adaptar la práctica a las restricciones de la cuenta', text: 'Mis archivos M4 usan Standard_B1s y contienen parámetros separados para myVM1, myVM2 y myVM3; los modifiqué por los límites de mi cuenta, con ayuda de IA. Los archivos demuestran la configuración preparada, pero no prueban por sí solos los tamaños finales desplegados ni una cuota universal de cuatro vCPU.' },
        { title: 'Comprobar más de una respuesta', text: 'El navegador mostraba repetidamente myVM2. Ejecuté quince invocaciones independientes de curl.exe desde myTestVM y la salida mostró los tres nombres. El balanceo por flujo no exige que cada recarga de navegador elija una VM distinta.' }
      ],
      codeTitle: 'Comando de validación desde myTestVM', codeNote: 'Transcrito de mi captura E05. Cada iteración lanza un proceso curl independiente. La captura acredita los nombres recibidos, no una medición de distribución estadística.',
      checks: [
        ['Estado inicial', '0% healthy; tres Down', 'E01 muestra el síntoma, no su causa por sí sola.'],
        ['Extensión de instalación', 'VMConfig: descarga fallida', 'E02 corresponde a myVM1; no generalizo el mismo mensaje a las otras VM sin evidencia.'],
        ['Reparación', 'Web-Server: Success True', 'E03 conserva script y salida de la reparación de myVM1.'],
        ['Estado posterior', '100% healthy; tres Up', 'E04 prueba la salud observada en ese momento.'],
        ['Prueba del cliente', 'Respuestas myVM1 / myVM2 / myVM3', 'E05 demuestra respuestas desde los tres backends; no failover, carga o reparto garantizado.']
      ],
      captions: ['E01 · Tres backends Down y 0% healthy antes de la reparación. Encabezado de cuenta excluido.', 'E02 · VMConfig: fallo al descargar install-iis.ps1 desde GitHub. Se excluyó el identificador de suscripción.', 'E03 · Instalación de IIS y página con nombre de VM; salida Success True de myVM1.', 'E04 · Tres backends Up y 100% healthy tras las reparaciones.', 'E05 · Prueba hacia la VIP privada: quince ejecuciones y respuestas de myVM1, myVM2 y myVM3.'],
      limits: ['No volví a consultar Azure ni a probar estos endpoints.', 'No determiné la causa de red exacta del fallo de descarga. No la atribuyo automáticamente a la cuenta Free, a un NSG o a la ausencia de NAT.', 'No afirmo failover probado, resistencia a carga, reparto uniforme ni tolerancia a una caída de zona.', 'Los archivos de parámetros son evidencia de preparación; no sustituyen una exportación del estado desplegado.', 'Intenté Traffic Manager después y las cuotas de App Service lo bloquearon. Ese intento no forma parte del resultado de este caso.'],
      lesson: 'Una VM desplegada no garantiza una aplicación disponible. Correlacionar extensión, servicio, probes y respuesta del cliente evita cambiar el balanceador a ciegas.',
      provenance: 'Basado en el laboratorio AZ-700 (módulo M4) de Microsoft Learn. Usé asistentes de IA como guía para la adaptación y el troubleshooting. Las capturas y los archivos son míos; evidencia del 19 de septiembre de 2026.'
    },
    en: {
      title: 'Recovering an internal Load Balancer service', date: '19 September 2026',
      summary: 'Diagnosing a timeout: from three unhealthy backends to verified responses from three IIS servers through one private frontend.',
      outcome: 'Screenshots show a change from 0% to 100% healthy instances and a client test from myTestVM returning myVM1, myVM2 and myVM3.',
      context: 'The M4 lab used an internal Azure Standard Load Balancer, three backend VMs and a client VM. I started from a deployment I had partly adapted with AI assistance, but my test against the private IP timed out.',
      diagram: `myTestVM → 10.1.2.4:80 → myIntLoadBalancer (internal)
                       → TCP/80 rule → backend pool
                           ├─ myVM1 · 10.1.0.5 · IIS
                           ├─ myVM2 · 10.1.0.6 · IIS
                           └─ myVM3 · 10.1.0.4 · IIS
Administration: Azure Bastion / Run Command`,
      architectureNote: 'Private VIP 10.1.2.4 was the service entry point, not a VM address. VM/IP mappings come from the health screenshot. The test client was inside the network environment.',
      decisions: [
        { title: 'Separate application failure from load-balancer failure', text: 'The panel showed three Down targets and probe timeouts. myVM1’s VMConfig extension showed Provisioning failed: it could not download install-iis.ps1 from raw.githubusercontent.com. This identifies an installation dependency failure, not the specific route, firewall or outbound mechanism responsible.' },
        { title: 'Repair IIS before recreating infrastructure', text: 'I used Run Command to install Web-Server and write each VM name into its homepage. I checked one repair before applying the others. My screenshots retain a successful execution and recovery to three Up targets.' },
        { title: 'Adapt the exercise to account constraints', text: 'My M4 files use Standard_B1s and include separate parameter files for myVM1, myVM2 and myVM3; I changed them because of my account limits, with AI assistance. These files establish prepared configuration, not final deployed sizes or a universal four-vCPU quota.' },
        { title: 'Validate more than one response', text: 'The browser repeatedly displayed myVM2. I then ran fifteen separate curl.exe invocations from myTestVM and they returned all three names. Flow-based distribution does not require every browser refresh to select a different VM.' }
      ],
      codeTitle: 'Validation command from myTestVM', codeNote: 'Transcribed from my E05 screenshot. Each iteration starts a separate curl process. The screenshot establishes received names, not statistical distribution.',
      checks: [
        ['Initial state', '0% healthy; three Down', 'E01 establishes the symptom, not its cause alone.'],
        ['Installation extension', 'VMConfig download failure', 'E02 is myVM1 evidence; I do not assume the same message for other VMs.'],
        ['Repair', 'Web-Server: Success True', 'E03 retains the script and successful myVM1 repair output.'],
        ['Later state', '100% healthy; three Up', 'E04 establishes observed health at that time.'],
        ['Client test', 'myVM1 / myVM2 / myVM3 responses', 'E05 demonstrates all three backends responding; not failover, load or guaranteed distribution.']
      ],
      captions: ['E01 · Three Down backends and 0% healthy before repair. Account header excluded.', 'E02 · VMConfig failed to download install-iis.ps1 from GitHub. Subscription identifier excluded.', 'E03 · IIS installation and VM-name page; myVM1 output shows Success True.', 'E04 · Three Up backends and 100% healthy after repairs.', 'E05 · Private-VIP test: fifteen invocations and responses from myVM1, myVM2 and myVM3.'],
      limits: ['I did not query Azure again or re-test these endpoints.', 'I did not establish the exact network cause of the download failure. I do not attribute it automatically to Free Trial, an NSG or missing NAT.', 'I do not claim tested failover, load resilience, uniform distribution or zone-failure tolerance.', 'Parameter files are preparation evidence, not a substitute for exported deployment state.', 'I attempted Traffic Manager later and App Service quotas blocked it. That attempt is not part of this case’s outcome.'],
      lesson: 'A deployed VM does not guarantee an available application. Correlating extension status, service, probes and client responses avoids changing the load balancer blindly.',
      provenance: 'Based on the Microsoft Learn AZ-700 lab (module M4). I used AI assistants as a guide for adaptation and troubleshooting. Screenshots and files are my own; evidence dated 19 September 2026.'
    }
  }
};
