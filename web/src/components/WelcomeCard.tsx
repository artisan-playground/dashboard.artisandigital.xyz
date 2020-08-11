import { CloseCircleOutlined } from '@ant-design/icons'
import { Card, Typography } from 'antd'
import React, { useState } from 'react'

const { Title, Text } = Typography

function WelcomeCard({ name, task, project }: any) {
  const [disable, setDisable] = useState(false)

  function onCloseClick() {
    setDisable(true)
  }
  return disable ? null : (
    <Card
      className="w-full rounded-lg h-36 pl-12 py-4 shadow-md"
      style={{ backgroundColor: '#518AFF' }}
    >
      <CloseCircleOutlined
        className="absolute top-0 right-0 mt-4 mr-4 z-50"
        onClick={onCloseClick}
        style={{ fontSize: '24px', color: '#fff' }}
      />
      <div className="ml-24 relative z-50">
        <div>
          <Text className="text-white text-2xl font-bold z-30">
            {!name ? `Hi!` : `Hi ${name} !`}
          </Text>
        </div>
        <div>
          <Text className="text-white text-lg">{`You have ${task} projects and ${project} tasks to finish.`}</Text>
        </div>
        <div>
          <Text className="text-white text-lg">Keep going, keep growing</Text>
        </div>
      </div>
      <div className="absolute left-0 bottom-0 overflow-hidden z-20 ml-8 -mb-1">
        <svg width={87} height={144} fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M65.551 2.976c1.095-.43 2.555.069 1.946 1.207-.652 1.218-3.064 1.233-4.426 1.209.137-.006.576-1.123.726-1.292.443-.498 1.081-.859 1.754-1.124zM52.944 25.174c-.386.262-.031.024 0 0zm13.88-16.542c.654.393.685 1.087.15 1.557-.638.56-1.8.54-2.669.485-.393-.024-2.49-.155-1.993-.425a1.966 1.966 0 00-.203.076c-.047.133-.095.264-.145.395.012.005.023.012.036.017l-.037-.015a13.855 13.855 0 01-2.165 3.72 5.542 5.542 0 011.086-.228c1.094-.11 3.395.557 2.17 1.701-1.174 1.097-3-.078-4.332-.24-1.292 1.416-2.718 2.773-4.211 4.085.091.022.171.069.217.142.6-.239 1.224-.58 1.778-.673.8-.133 2.44-.215 3.044.347.743.69-.054 1.252-.933 1.385-1.274.193-2.94-.295-4.166-.624-.14.019-.293-.013-.384-.101l-.08-.02c-1.513 1.305-3.084 2.567-4.644 3.802l.05-.003c.407-.21.844-.381 1.317-.472 1.094-.21 2.382-.211 3.27.41.884.619 1.197 1.701.281 2.397-1.833 1.392-4.53-1.78-5.454-1.911-1.586 1.241-3.263 2.401-4.966 3.538.193-.047.392-.08.597-.096 1.67-.126 5.587 1.479 3.537 3.06-1.787 1.379-3.851-1.272-5.29-2.198-1.605 1.059-3.218 2.111-4.787 3.204.855-.178 1.682-.205 2.598.012.948.225 2.479.787 1.878 1.792-.61 1.023-2.448.558-3.405.234-.522-.177-1.568-.774-2.487-1.025-2.503 1.855-4.671 3.898-6.313 6.305a19.134 19.134 0 00-2.352 4.757c-.35 1.053-1.04 2.821-.902 4.191-.655-2.742.534-6.037 1.815-8.489 1.177-2.255 2.938-4.234 5-6.016-.516-1.221-4.869-2.981-2.265-4.117 1.382-.6 2.797.395 3.098 1.449.207.724-.11 1.635-.445 2.338a39.153 39.153 0 012.018-1.578c.96-.702 1.943-1.385 2.936-2.058-1.634-1.206-3.18-4.652-.987-5.217 3.238-.831 1.676 3.872 1.45 4.753a.204.204 0 01-.15-.045c.017.08.038.167.064.254 1.9-1.282 3.828-2.54 5.693-3.853-.168-.098-.435-.47-.645-.668-.473-.446-.925-.913-1.256-1.435-.523-.826-1.026-2.143.36-2.63 1.509-.53 2.224.96 2.234 1.85.007.614-.207 1.198-.318 1.8-.035.188.098 1.035-.228.671.015.134.018.232.01.3.335-.236.667-.476.997-.717a.264.264 0 01-.03-.102c-.017-.265.323-.367.561-.29.436-.325.867-.654 1.29-.99a171.71 171.71 0 002.714-2.188c-.196-.133-.118-.316-.301-.456s-.544-.218-.76-.348c-.54-.327-.99-.804-1.314-1.274-.536-.775-1.228-2.403.339-2.773 1.615-.383 2.434 1.184 2.537 2.163.02.19-.162 1.9-.3 2.522 1.673-1.388 3.32-2.828 4.811-4.293-.452-.003-1.733-.73-1.992-.928-.632-.483-1.636-1.552-.527-2.118.985-.503 2.2.224 2.62.93.07.116.313 1.199.332 1.684a40.298 40.298 0 001.754-1.872 18.6 18.6 0 001.027-1.282.688.688 0 01-.218-.168c-1.643-.218-3.737-2.23-1.806-2.931.92-.333 1.916.354 2.365.916.092.115.241.694.363 1.15a21.197 21.197 0 002.158-4.549c-.143-.028-.265-.113-.28-.26-.798-.358-1.428-.655-1.985-1.341-.345-.427-.968-1.4.05-1.638 1.322-.308 2.152 1.278 2.26 2.06.013.09.012.354.008.595a.566.566 0 01.137.002c.305-.972.548-1.957.742-2.944-.722-.182-.845-3.16-.364-3.583 1.075-.95 1.833.42 1.775 1.146-.069.854-.562 1.632-1.15 2.322-.063.073-.045.07-.062-.033a.186.186 0 01-.062.115c.03.45.089.91.06 1.308a24.106 24.106 0 01-.498 3.412c-.06.273-.128.545-.205.814a9.003 9.003 0 011.67-.842c.795-.28 2.02-.582 2.809-.109zm-40.04 39.473c.04.367.153.7.377.975a4.605 4.605 0 01-.376-.975z"
            fill="#ECC129"
          />
          <g opacity={0.5} fillRule="evenodd" clipRule="evenodd">
            <path
              opacity={0.7}
              d="M55.575 40.298c1.31-1.48 3.742-5.242 5.586-5.771 1.188-.341.842 3.185.857 3.857.057 2.602-.263 5.186-.657 7.766-.711 4.651-3.035 8.794-6.223 12.753-1.64 2.037-3.564 4.1-6.23 5.37-1.226.586-2.702.684-3.913 1.188-1.411.587-.643.113-1.278 1.278-.883 1.618-1.166 3.705-1.574 5.431-1.876 7.925-6.417 49.818-5.63 57.879.07.715-1.187.886-1.25.013-.333-4.625 2.553-36.652 4.009-47.126 1.456-10.474 2.929-19.727 4.406-23.351 1.792-4.396 5.03-9.683 7.724-13.783 1.251-1.904 2.616-3.743 4.173-5.504z"
              fill="#0A2F21"
            />
            <path
              opacity={0.7}
              d="M65.301 91.669c3.41-1.985 7.1 1.76 4.015 3.745-1.705 1.097-3.489.707-4.493-.207-.651.63-1.261 1.288-1.847 1.844a97.859 97.859 0 00-5.087 5.205c-3.35 3.688-6.223 7.585-9.225 11.411-2.963 3.776-5.903 7.571-8.588 11.442-2.275 3.28-5.308 7.139-6.087 10.734 1.182-7.626 5.667-14.956 11.007-21.679 5.297-6.668 11.376-13.949 19.578-19.212-.835-.972-.858-2.361.727-3.283z"
              fill="#81CCDB"
            />
            <path
              opacity={0.7}
              d="M.597 73.07c1.908.296 5.026 3.717 6.599 5.02 1.869 1.55 3.565 3.201 5.163 4.931 3.442 3.724 6.52 7.683 9.136 11.812 4.267 6.731 7.685 13.64 10.166 20.969 1.518 4.487 2.502 9.137 3.084 13.755.11.871 1.262 7.585-.398 7.766-1.492.163-1.031-5.099-1.103-5.814-.815-8.074-3.253-15.93-6.645-23.54-.74-1.658-1.426-3.688-2.608-5.18-.85-1.075-.006-.7-1.501-1.107-1.284-.349-2.747-.264-4.062-.691-2.857-.929-5.144-2.731-7.149-4.544-3.896-3.524-6.984-7.337-8.593-11.852-.893-2.503-1.714-5.021-2.169-7.602-.118-.667-1.15-4.114.08-3.923z"
              fill="#0A2F21"
            />
            <path
              opacity={0.7}
              d="M8.127 16.143c7.187 9.88 13.094 20.734 16.908 31.727 2.31 6.66 3.926 13.495 5.532 20.28 2.486 10.506 4.837 21.011 5.506 31.704.673 10.755 2.004 23.159-2.439 33.518 2.22-10.517.106-21.711-.268-32.293-.178-5.052-.697-10.054-1.376-15.076-.66-4.872-1.737-9.72-2.74-14.554a509.805 509.805 0 00-1.525-7.053c-.156-.701-.222-2.781-.783-3.26-.564-.482-3.444-.678-4.349-1.032-1.82-.712-3.533-1.724-5.05-2.793-2.905-2.049-5.433-4.727-7.429-7.366-4.616-6.107-6.462-13.56-6.369-20.633.018-1.373 2.804-16.161 1.685-16.365a2.92 2.92 0 00.192-.194 265.352 265.352 0 012.505 3.39z"
              fill="#81CCDB"
            />
            <path
              opacity={0.7}
              d="M85.705 51.778c.11-.127.832-1.009.469-.953.74-.114-1.018.973.826.306-.875.655-.37 1.507-.359 2.389.02 1.432-.283 2.852-.623 4.254-.538 2.215-1.339 4.369-2.502 6.43-2.534 4.49-6.837 8.812-11.946 11.62-2.522 1.386-4.993 1.858-7.87 2.496-1.817.403-1.96 1.148-2.925 2.545-2.008 2.91-3.98 5.81-5.75 8.82-2.115 3.593-4.167 7.19-6.103 10.846-6.523 12.315-11.831 25.074-14.62 38.278-.068-7.781 2.203-15.795 5.068-23.212 2.087-5.403 4.803-10.613 7.7-15.769.703-1.249 1.767-2.856 2.065-4.235.209-.966-.43-1.896-.722-2.914-1.14-3.963-1.058-8.404-.057-12.39 1.103-4.394 4.293-6.434 9.69-7.056 1.973-.228 4.481-.144 6.291-.811 1.972-.727 2.785-3.114 3.906-4.647 3.011-4.117 6.59-8.065 10.698-11.534a33.07 33.07 0 013.659-2.668c.818-.518 2.547-1.157 3.105-1.795z"
              fill="#81CCDB"
            />
          </g>
        </svg>
      </div>
      <div className="absolute right-0 bottom-0 overflow-hidden z-20 -mb-1 mr-8 hidden lg:block">
        <svg width={124} height={146} fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.91 5.525c-1.751-.786-4.086.125-3.112 2.202C5.841 9.951 9.7 9.98 11.878 9.935c-.218-.01-.92-2.05-1.16-2.358-.71-.91-1.73-1.568-2.807-2.052zm20.182 39.873c.442.342.036.032 0 0zM6.223 15.584c-1.025.709-1.074 1.96-.236 2.807.997 1.008 2.817.972 4.176.873.615-.044 3.897-.282 3.12-.768.06.02.184.07.318.138.072.238.147.475.226.71-.019.01-.036.022-.056.032.022-.009.038-.018.058-.027a26.084 26.084 0 003.384 6.706 7.682 7.682 0 00-1.7-.41c-1.711-.197-5.314 1.007-3.398 3.07 1.836 1.976 4.696-.145 6.78-.437 2.022 2.552 4.251 4.998 6.587 7.363a.546.546 0 00-.34.256c-.938-.43-1.914-1.045-2.782-1.212-1.251-.24-3.818-.385-4.764.628-1.163 1.246.084 2.258 1.459 2.497 1.993.347 4.602-.534 6.52-1.13.22.036.459-.022.602-.181l.126-.037c2.366 2.353 4.822 4.628 7.263 6.853l-.079-.004c-.637-.378-1.32-.688-2.06-.85-1.713-.378-3.728-.38-5.118.741-1.385 1.117-1.875 3.069-.443 4.322 2.867 2.509 7.092-3.212 8.538-3.45 2.48 2.237 5.104 4.328 7.768 6.376a5.176 5.176 0 00-.933-.172c-2.613-.226-8.746 2.671-5.54 5.522 2.795 2.484 6.03-2.297 8.281-3.97 2.511 1.91 5.036 3.806 7.49 5.776-1.339-.321-2.632-.369-4.067.023-1.484.407-3.88 1.42-2.941 3.233.954 1.844 3.83 1.005 5.329.42.817-.32 2.455-1.397 3.894-1.85 3.915 3.343 7.306 7.026 9.874 11.364a36.843 36.843 0 013.675 8.577c.547 1.898 1.624 5.087 1.408 7.558 1.027-4.946-.83-10.886-2.832-15.307-1.84-4.066-4.594-7.634-7.82-10.847.81-2.202 7.623-5.378 3.55-7.424-2.163-1.082-4.378.713-4.851 2.614-.325 1.307.17 2.948.695 4.216a63.308 63.308 0 00-3.157-2.843 160.213 160.213 0 00-4.593-3.71c2.559-2.175 4.98-8.391 1.55-9.408-5.067-1.497-2.627 6.983-2.274 8.572.1.005.179-.022.236-.081a8.308 8.308 0 01-.101.458c-2.973-2.312-5.989-4.578-8.906-6.945.263-.175.68-.847 1.009-1.204.741-.806 1.45-1.647 1.968-2.59.819-1.489 1.608-3.864-.562-4.74-2.36-.954-3.48 1.732-3.497 3.335-.011 1.108.322 2.161.496 3.248.055.339-.155 1.866.356 1.209a2.931 2.931 0 00-.016.542c-.523-.427-1.043-.859-1.56-1.294a.53.53 0 00.046-.184c.028-.477-.504-.662-.877-.522a90.384 90.384 0 01-2.018-1.783c-1.405-1.282-2.83-2.6-4.245-3.945.308-.239.185-.57.473-.823.286-.252.85-.392 1.188-.627.848-.59 1.55-1.45 2.059-2.298.84-1.4 1.924-4.335-.528-5.002-2.527-.688-3.81 2.138-3.973 3.904-.032.343.252 3.427.469 4.546-2.619-2.501-5.194-5.096-7.527-7.737.708-.006 2.713-1.317 3.119-1.674.989-.873 2.562-2.8.827-3.821-1.542-.905-3.443.406-4.102 1.68-.109.21-.49 2.161-.52 3.037a69.556 69.556 0 01-2.744-3.376 33.116 33.116 0 01-1.606-2.31c.12-.061.234-.169.34-.303 2.573-.394 5.852-4.024 2.83-5.287-1.438-.6-2.997.639-3.702 1.654-.144.207-.378 1.251-.569 2.075-1.437-2.609-2.536-5.37-3.372-8.203.224-.05.414-.205.439-.47 1.248-.645 2.234-1.18 3.106-2.419.542-.77 1.517-2.526-.074-2.953C15.3 7.336 14 10.196 13.83 11.605c-.02.164-.02.64-.012 1.076a.77.77 0 00-.216.003 56.212 56.212 0 01-1.157-5.308c1.13-.33 1.325-5.698.573-6.463-1.682-1.711-2.869.761-2.78 2.068.107 1.541.879 2.943 1.798 4.187.099.131.07.125.096-.059.014.091.048.158.098.207-.048.81-.14 1.641-.096 2.359.127 2.055.392 4.123.777 6.152.093.493.2.983.32 1.468-.908-.7-2.133-1.322-2.612-1.517-1.244-.504-3.161-1.049-4.397-.194zm62.565 71.353c-.058.717-.2 1.374-.468 1.915.2-.616.354-1.257.468-1.915z"
            fill="#ECC129"
          />
          <g opacity={0.7} fillRule="evenodd" clipRule="evenodd">
            <path
              opacity={0.7}
              d="M41.983 54.072c4.864-.229 10.88 2.34 11.4 7.123.376 3.475.26 6.94.843 10.41.467 2.773 1.453 5.435 2.8 7.962 1.293 2.429 3.977 4.497 4.676 7.092.445 1.653.196 3.98-.418 5.597-.746 1.966-.35 1.81 1.137 3.46 2.914 3.235 5.538 6.551 7.393 10.413 2.673 5.563 4.425 12.065 3.433 18.154-.126.773-.276 3.548-1.453 3.742-1.315.217-.7-1.37-.63-1.883.447-3.271.845-6.13.305-9.452-2.082-12.818-12.248-21.263-18.868-32.142-.364-.56-1.132-1.897-1.666-2.778-.843-1.391-1.69-4.04-2.833-5.07-2.15-1.945-.173 1.963.246 2.709.53.944 1.113 1.946 1.655 2.773 2.484 3.833 5.256 8.016 7.821 11.967-11.093 2.287-18.906-9.777-21.883-17.707-2.453-6.535-5.388-21.811 6.041-22.37z"
              fill="#81CCDB"
            />
            <path
              opacity={0.7}
              d="M107.183 41.938c-8.132.583-13.353 5.437-15.783 12.226-1.31 3.658-1.46 7.416-2.188 11.176-1.094 5.657-3.45 9.943-8.055 13.973-1.426 1.248-2.477 2.53-3.224 3.9-1.483 1.37-2.774 2.919-3.722 4.813-1.212 2.418-1.555 5.32-.156 7.731.376.648 1.314 1.95 2.287 2.54-3.64 7.014-5.642 14.695-5.417 22.366.137 4.631.386 9.263.678 13.888.079 1.242.526 3.293 1.197 1.21.615-1.905-.156-4.896-.227-6.886-.347-9.695-.644-18.51 3.768-27.567.463-.95.954-1.892 1.465-2.826.03-.016.057-.034.085-.053l.057.042c.033-.053.077-.116.13-.186.146-.136.274-.31.396-.502.391-.49.834-1.067.836-1.383l-.001-.008c2.731-4.033 5.86-7.844 9.055-11.58-.024.027 3.467-4.271 2.927-1.894-.26 1.145-2.827 3.327-3.864 4.54-2.294 2.7-4.987 6.12-7.225 9.427-.302.157-.727.925-1.035 1.498-.17.29-.328.583-.484.837 7.93 2.37 14.1-2.404 18.306-7.956l.015-.02c1.28-1.534 2.591-3.058 4.229-4.27 2.734-2.025 5.661-2.382 8.883-3.378 8.788-2.716 12.525-13.017 13.712-20.661 1.339-8.624-5.211-21.848-16.645-20.998z"
              fill="#0A2F21"
            />
            <path
              opacity={0.7}
              d="M91.12 17.788c-8.347 7.857-12.38 18.755-15.572 29-3.566 11.443-5.922 23.063-6.012 34.96-.06 7.816-.294 15.682.21 23.489.179 2.773.485 5.55.97 8.293.04.226 1.128 6.35 2.168 4.923.591-.811-1.115-6.353-1.243-7.276-.726-5.199-.894-10.436-.859-15.673.058-8.621-.223-17.199.743-25.788.144-1.283.258-2.63.595-3.885.358-1.333-.098-.751 1.067-1.28 1.132-.513 2.53-.44 3.705-1.083 4.658-2.555 7.04-9.118 8.895-13.423 2.122-4.924 3.41-10.175 4.44-15.357a98.478 98.478 0 001.603-11.447c.096-1.216.102-2.486.366-3.681.071-.323.428-.893.415-1.178-.027-.605-.43-.96-.463-1.468-.35.285-.693.576-1.028.874z"
              fill="#0A2F21"
            />
            <path
              opacity={0.7}
              d="M73.708 122.547h-1.375c.096-1.559.222-3.116.51-4.659 1.102-5.899 4.55-14.563 12.111-15.52.28-.036 1.305-.042 2.548.024a4.947 4.947 0 011.945-.519c6.437-.429 13.627 4.268 16.732 9.157 2.503 3.941 2.082 9.117.535 13.305-1.035 2.803-3.295 6.8-7.063 6.839-4.715.049-4.942-5.222-5.034-8.303-.12-4.097-.693-7.665-4.262-10.458-.832-.65-1.74-1.222-2.58-1.864-1.317-1.004-2.77-2.032-2.94-3.693-.234-2.292 1.196-2.704 3.38-2.278.372.072 4.122 1.594 3.567.391-.17-.367-.789-.659-1.57-.877-2.022-.199-4.433-.429-5.127-.291-7.481 1.484-10.394 10.857-11.167 16.813a50.437 50.437 0 00-.21 1.933z"
              fill="#81CCDB"
            />
          </g>
        </svg>
      </div>
      <div className="absolute left-0 md:top-0 bottom-0 right-0">
        <svg width="100%" viewBox="812 54 420 180" className="w-full h-full rounded-lg z-0">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 8a8 8 0 018-8h39.31c47.31 0 141.929 0 234.796 25.604 94.62 26.768 189.239 79.141 283.859 125.694 94.619 45.389 187.486 84.96 282.106 65.175 94.619-19.786 189.239-97.762 283.859-97.762 94.62 0 187.49 77.976 282.11 77.976 94.61 0 189.23-77.976 283.85-104.744 92.87-26.769 187.49 0 234.8 12.802l41.58 12.273a7.997 7.997 0 015.73 7.672v182.708c0 4.419-3.58 8-8 8H8a8 8 0 01-8-8V8z"
            fill="rgba(16,94,252,0.5)"
            fillOpacity={1}
          />
        </svg>
      </div>
    </Card>
  )
}

export default WelcomeCard
